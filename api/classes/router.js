const router = require('express')();
const validateUsersRole = require('../middleware/validateUsersRole');
const Classes = require('./classes-model');

const dbErrorMessage = {
    message: "Some error occured..."
}

// GET a list of all posts. IF query strings are provided, search by those values. If not, return a list of all objects.
// In a successful response, this endpoint always resolves to an _array_
router.get('/', validateUsersRole(), async (req, res) => {
    try {
        const results = await Classes.findBy({ ...req.query });
        res.status(200).json(results);
    } catch {
        res.status(500).json(dbErrorMessage);
    }
});

// POST classes -- creates new class object and returns new object upon
router.post('/', validateUsersRole(), async (req, res) => {
    try {
        const classData = req.body;

        // Validate user's role
        if (req.cookies.user.role != 2) {
            return res.status(403).json({
                message: "User does not have permission to create class"
            })
        }

        // Validate the request body
        if (!classData.name || !classData.start_time || !classData.duration_hour || !classData.intensity_level || !classData.location) {
            return res.status(400).json({
                message: "Missing some parameters/properties. Required: (name, start_time, duration_hour, intensity_level, location)"
            })
        }

        // Check that no other class with that name exists already
        const [ isClassWithName ] = await Classes.findBy({ name: classData.name });
        if (isClassWithName) {
            return res.status(400).json({
                message: "A class with that name already exists. Name must be unique"
            })
        }

        const classObj = await Classes.add(classData);

        if (!classObj) {
            return res.status(400).json({
                message: "Some error occured with the data you provided. Please check the parameters and syntax."
            })
        }

        return res.status(201).json(classObj);

    } catch {
        res.status(500).json(dbErrorMessage);
    }
})

// PUT classes -- updates class with given id
router.put('/:id', validateUsersRole(), async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;

        if (!changes) {
            return res.status(400).json({
                message: "Empty request body"
            })
        }

        const classObj = await Classes.findById(id);

        if (!classObj) {
            return res.status(400).json({
                message: "No class with that ID"
            })
        }

        const didClassUpdate = await Classes.update(id, changes);

        if (!didClassUpdate) {
            return res.status(400).json({
                message: "Class not updated. Check that you are providing properties to change"
            });
        }

        return res.status(200).json({
            message: "Class updated"
        })

    } catch {
        res.status(500).json(dbErrorMsg);
    }
})

// DELETE classes -- removes class with given id
router.delete('/:id', validateUsersRole(), async (req, res) => {
    try {
        const { id } = req.params;

        const classObj = await Classes.findById(id);

        if (!classObj) {
            return res.status(400).json({
                message: "No class with that ID"
            })
        }

        const didClassDelete = await Classes.remove(id);

        if (!didClassDelete) {
            return res.status(400).json({
                message: "Could not delete class"
            })
        }

        res.status(200).json({
            message: "Class deleted"
        })
    } catch {
        res.status(500).json(dbErrorMessage);
    }
})

module.exports = router;