function validateUserRole() {
    return function(req, res, next) {
        console.log(req.cookies);
        const { user } = req.cookies;
        if (user.role != 2) {
            // A role of 2 means instructor. 1 means client
            return res.status(403).json({
                message: "Your role does not grant these permissions"
            })
        }

        next();
    }
}

module.exports = validateUserRole;