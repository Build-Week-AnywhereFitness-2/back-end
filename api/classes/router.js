const router = require('express')();
const Classes = require('./classes-model');

// GET a list of all posts. IF query strings are provided, search by those values. If not, return a list of all objects.
// In a successful response, this endpoint always resolves to an _array_
router.get('/', (req, res) => {
    const { name, type, start_time, duration, intensity_level, location, attendees_amt, max_class_size, cancelled } = req.query;

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