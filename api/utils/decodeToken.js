const jwt = require('jsonwebtoken');

// decodes token. callback function should have (err, decoded) args
function decodeToken(token, callback) {
    const jwtSecret = process.env.JWT_SECRET || "keepitsafe,keepitsecret";

    jwt.verify(token, jwtSecret, callback);
}

module.exports = decodeToken;