const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Generates and returns JWT with our config
function generateToken(payload) {
    const token = jwt.sign(payload, jwtConfig.secret);
    return token;
}

module.exports = generateToken;