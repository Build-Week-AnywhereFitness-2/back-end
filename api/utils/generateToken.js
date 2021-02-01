const jwt = require('jsonwebtoken');

// Generates and returns JWT with our config
function generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "keepitsafe,keepitsecret");
    return token;
}

module.exports = generateToken;