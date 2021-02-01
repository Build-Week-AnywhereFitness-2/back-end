const decodeToken = require('../utils/decodeToken');

// Middleware that restricts routes depending on user authorization
function restrictRoute() {
    return function (req, res, next) {
        const token =  req.headers.authorization;

        // IF the user is not on a restricted path, return and call next (allow client to continue).
        if (req.path === '/api/auth/login' || req.path === '/api/auth/register') {
            return next();
        }

        if (!token) {
            return res.status(403).json({
                message: "No authorization token"
            })
        }

        decodeToken(token, (err) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid authorization token"
                })
            }

            return next();
        })
    }
}

module.exports = restrictRoute;