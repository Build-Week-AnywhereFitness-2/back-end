const db = require('../../data/dbConfig');

function find() {
    return db('signup_codes');
}

function findByCode(code) {
    return db('signup_codes').where({ code }).first();
}

module.exports = {
    find,
    findByCode
}