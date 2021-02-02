const db = require('../../data/dbConfig');

async function find() {
    return await db('instructors_classes');
}

function findByUserId(user_id) {
    return db('instructors_classes as iC')
        .where({ user_id })
        .join('classes as c', 'c.id', '=', 'iC.class_id');
}

async function add(user_id, class_id) {
    return db('instructors_classes').insert({ user_id, class_id });
}

module.exports = {
    find,
    findByUserId,
    add
}