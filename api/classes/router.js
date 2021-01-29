const router = require('express')();
const Classes = require('./classes-model');

// GET a list of all posts. IF query strings are provided, search by those values. If not, return a list of all objects.
// In a successful response, this endpoint always resolves to an _array_
router.get('/', (req, res) => {
    Classes.findBy({ ...req.query })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({
                message: "DB error occured"
            })
        })
});

module.exports = router;