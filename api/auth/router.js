const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateUserCreds = require('../middleware/validateUserCreds');

const Users = require('./users-model');
const SignupCodes = require('./signup_code-model');

const dbErrorMsg = { message: "There has been an error with the database" }

router.post('/register', validateUserCreds(), async (req, res) => {
    try {
        let userData = {
            username: req.credentials.username,
            password: req.credentials.password,
            full_name: req.body.full_name,
            ...req.body
        }

        // Check that the client provided a full_name
        if (!userData.full_name) {
            return res.status(400).json({
                message: "Missing required param: full_name"
            })
        }

        // Check to see if the username is already taken
        const isUsernameTaken = (await Users.findByUsername(userData.username) ? true : false)

        if (isUsernameTaken) {
            return res.status(400).json("username taken")
        }

        // Generate password hash and set it to the userData obj
        const passwordHash = bcrypt.hashSync(userData.password, process.env.SALT || 8);
        userData.password = passwordHash;

        // Check if client provided signup code. If so, verify it with the DB
        if (userData.signup_code) {
            SignupCodes.findByCode(userData.signup_code)
                .then(code => {
                    // If the provided code does not exist in the DB, return a response of status 400
                    if (!code) {
                        return res.status(400).json({
                            message: "Invalid code provided"
                        })
                    }

                    // Set the signup_code to the code's id
                    userData.signup_code = code.id;
                    userData.role = 2;
                })
        }

        // Add user
        const newUser = await Users.add(userData);
        return res.status(201).json({ ...newUser, password: "HIDDEN" });
    } catch (err) {
        console.log(err)
        res.status(500).json(dbErrorMsg);
    }
});

router.post('/login', validateUserCreds(), async (req, res) => {
  try {
    const user = await Users.findByUsername(req.credentials.username);

    if (!user) {
      return res.status(400).json("invalid credentials")
    }

    const isPasswordValid = bcrypt.compareSync(req.credentials.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json("invalid credentials")
    }

    // Generate JWT -- setup additional JWT settings with an options obj in this call
    const token = jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET || "keepitsafe,keepitsecret");
    if (!token) {
      return res.status(500).json("please try again");
    }

    return res.status(200).json({
      message: `Welcome, ${user.username}`,
      token
    })

  } catch {
    res.status(500).json(dbErrorMsg);
  }

});

// Endpoint for user's editing their account. Placing this endpoint in the auth router might be a debatable choice
router.put('/user/:id', (req, res) => {
  const { id } = req.params;

  if (req.body.username || req.body.id) {
    return res.status(400).json({
      message: "The provided data is not changeable. (username, id)"
    })
  }

  Users.update(id, req.body)
    .then(success => {
      if (!success) {
        return res.status(400).json({
          message: "There has been an issue updating the account with the provided data. Please check the given parameters in the request body"
        });
      }

      Users.findById(id)
        .then(user => {
          res.status(200).json(user);
        })
    })
    .catch(() => {
      res.status(500).json({
        message: "DB error"
      })
    })
})

module.exports = router;
