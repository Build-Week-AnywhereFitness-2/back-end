const jwt = require('jsonwebtoken');

// Middleware that restricts routes depending on user authorization
function restrictRoute() {
    return function (req, res, next) {
        const token = req.headers.authorization;

        // IF the user is not on a restricted path, return and call next (allow client to continue).
        if (req.path === '/api/auth/login' || req.path === '/api/auth/register') {
            return next();
        }

        if (!token) {
            return res.status(403).json({
                message: "No authorization token"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET || 'keepitsafe,keepitsecret', (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid authorization token"
                })
            }

            req.user = decoded.payload;
        })

        return next();
    }
}

module.exports = restrictRoute;