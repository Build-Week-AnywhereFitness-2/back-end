const router = require('express').Router();
const bcrypt = require('bcryptjs');

// utils / middleware
const validateUserCreds = require('../middleware/validateUserCreds');
const generateToken = require('../utils/generateToken');
const decodeToken = require('../utils/decodeToken');

// Models
const Users = require('./users-model');
const SignupCodes = require('./signup_code-model');

const dbErrorMessage = { message: "There has been an error with the database" }

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
            return res.status(400).json({
              message: "username taken"
            })
        }

        // Generate password hash and set it to the userData obj
        const passwordHash = bcrypt.hashSync(userData.password, process.env.SALT || 8);
        userData.password = passwordHash;


        if (userData.signup_code) {
          const code = SignupCodes.findByCode(userData.signup_code);

          if (!code) {
            return res.status(400).json({
              message: "Invalid code"
            })
          }

          // Set the signup_code to the code's id
          userData.signup_code = code.id;
          userData.role = 2;
        }

        // Add user
        const newUser = await Users.add(userData);
        return res.status(201).json({ ...newUser, password: "HIDDEN" });
    } catch (err) {
        console.log(err);
        res.status(500).json(dbErrorMessage);
    }
})

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

    const jwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      full_name: user.full_name
    }

    // Generate JWT
    const token = generateToken(jwtPayload);

    if (!token) {
      return res.status(500).json("please try again");
    }

    // Set payload to cookies
    res.cookie('user', jwtPayload);

    return res.status(200).json({
      message: `Welcome, ${user.username}`,
      token
    })

  } catch (err) {
    console.log(err)
    res.status(500).json(dbErrorMessage);
  }
})

// Endpoint for user's editing their account. Placing this endpoint in the auth router might be a debatable choice
router.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    // Validate user input
    if (req.body.username || req.body.id) {
      return res.status(400).json({
        message: "The provided data is not changeable. (username, id)"
      })
    }

    // Check if the request provides a password -- if so, hash the new password
    if (req.body.password) {
      const passwordHash = bcrypt.hashSync(req.body.password, process.env.SALT || 8);
      req.body.password = passwordHash;
    }

    // Check that the user sending the request is the same user
    if (id !== req.cookies.user.sub) {
      return res.status(403).json({
        message: "User can only update their own account"
      })
    }

    const didUserUpdate = await Users.update(id, changes);

    if(!didUserUpdate) {
      return res.status(400).json({
        message: "There has been an issue updating the account with the provided data. Please check the given parameters in the request body"
      })
    }

    const updatedUser = await Users.findById(id);

    res.status(200).json(updatedUser);
  } catch {
    res.status(500).json(dbErrorMessage);
  }
})

// GET -- sends back the user data to the user
router.get('/whoami', async (req, res) => {
  try {
    // No need to check that user has auth in headers. Our middleware takes care of that
    const token = req.headers.authorization;

    decodeToken(token, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid token"
        })
      }

      const user = decoded;

      return res.status(200).json({ id: user.sub, ...user });
    })

  } catch {
    res.status(500).json(dbErrorMessage);
  }
})

module.exports = router;
