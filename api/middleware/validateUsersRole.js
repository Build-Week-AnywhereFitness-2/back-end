const decodeToken = require('../utils/decodeToken');

function validateUsersRole() {
    return function(req, res, next) {
        const token = req.headers.authorization;
        decodeToken(token, (err, payload) => {
            // if err exists, the token's signature cannot be trusted
            if (err) {
                return res.status(400).json({
                    message: "Invalid token"
                })
            }

            // Check if the user is not an instructor (role = 2)
            if (payload.role != 2) {
                return res.status(403).json({
                    message: "Users role does not grant these permissions"
                })
            }

            next();
        })
    }
}

module.exports = validateUsersRole;