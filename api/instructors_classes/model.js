const db = require('../../data/dbConfig');

async function find() {
    return await db('clients_classes');
}

async function add(user_id, class_id) {
    return db('instructors_classes').insert({ user_id, class_id });
}

module.exports = {
    find,
    add
}