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

router.post('/', (req, res) => {
    const classData = req.body;

    // Validate the request body
    if (!classData.name || !classData.start_time || !classData.duration_hour || !classData.intensity_level || !classData.location) {
        return res.status(400).json({
            message: "Missing some parameters/properties. Required: (name, start_time, duration_hour, intensity_level, location)"
        })
    }

    Classes.add(classData)
        .then(newClass => {
            return res.status(201).json(newClass);
        })
        .catch(() => {
            res.status(500).json({
                message: "Some error occured"
            })
        })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!changes) {
        return res.status(400).json({
            message: "Empty request body"
        })
    }

    Classes.findById(id)
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    message: "No class with that ID"
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                message: "Some error occured DB"
            })
        })

    Classes.update(id, changes)
        .then(didUpdate => {
            if (!didUpdate) {
                return res.status(400).json({
                    message: "Class not updated. Check that you are providing properties to change"
                })
            }

            return res.status(200).json({
                message: "Class updated"
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "Some error occurred"
            })
        })
})

module.exports = router;