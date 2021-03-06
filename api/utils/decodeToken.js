const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// decodes token. callback function should have (err, decoded) args
function decodeToken(token, callback) {
    jwt.verify(token, jwtConfig.secret, callback);
}

module.exports = decodeToken;