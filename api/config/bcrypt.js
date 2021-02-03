// Config for bcrypt
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(process.env.SALT || 8);

module.exports = {
    salt
}