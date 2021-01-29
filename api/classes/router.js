const router = require('express')();
const Classes = require('./classes-model');

// GET a list of all posts
router.get('/', (req, res) => {
    Classes.findBy({ name: "Crossfit 102" })
        .then(result => {
            res.status(200).json(result);
        })
});

// GET a list of

module.exports = router;