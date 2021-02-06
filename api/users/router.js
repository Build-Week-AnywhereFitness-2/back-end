const router = require('express').Router();

const Users = require('../auth/users-model');
const Classes = require('../classes/classes-model');
const ClientsClasses = require('../clients_classes/model');
const InstructorsClasses = require('../instructors_classes/model');

const dbErrorMsg = {
    message: "Some DB error occured."
}

// GET -- /api/users/:id/clients-classes
router.get('/:id/clients-classes', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        if (!user) {
            return res.status(400).json({
                message: "No user with that ID"
            })
        }

        const results = await ClientsClasses.findByUserId(id);

        res.status(200).json(results);
    } catch {
        res.status(500).json(dbErrorMsg);
    }
});

// GET -- api/users/:id/instructors-classes
router.get('/:id/instructors-classes', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        if (!user) {
            return res.status(400).json({
                message: "No user with that ID"
            })
        }

        const results = await InstructorsClasses.findByUserId(id);

        res.status(200).json(results);
    } catch {
        res.status(500).json(dbErrorMsg);
    }
})

// POST -- /api/users/:id/attend-class. Marks the user's planned attendance of a class
router.post('/:id/attend-class', async (req, res) => {
    try {
        const { id } = req.params;
        const { class_id } = req.body;

        if (!class_id) {
            return res.status(400).json({
                message: "Required parameters: (class_id)"
            })
        }

        const user = await Users.findById(id);
        const classObj = await Classes.findById(class_id);

        if (!user || !classObj) {
            return res.status(400).json({
                message: "User or class with specified IDs do not exists."
            })
        }

        const client_class = await ClientsClasses.add(id, class_id);

        if (!client_class) {
            return res.status(500).json({
                message: "Problem creating attendance"
            })
        }

        res.status(200).json({
            message: "Attendance created"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(dbErrorMsg);
    }
})

module.exports = router;