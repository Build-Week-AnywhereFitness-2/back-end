const db = require('../../data/dbConfig');

function find() {
    return db('clients_classes');
}

function findByUserId(user_id) {
    return db('clients_classes as cC')
        .where({ user_id })
        .join('classes as c', 'c.id', '=', 'cC.class_id')
        .select('id', 'name as class_name', 'type as class_type', 'start_time', 'duration_hour', 'intensity_level', 'location', 'attendees_amt', 'max_class_size', 'cancelled');
}

async function add(user_id, class_id) {
    const [ createdDocs ] = await db('clients_classes').insert({ user_id, class_id });

    if (!createdDocs || createdDocs <= 0) {
        return Promise.resolve(null);
    }

    return Promise.resolve(true);
}

module.exports = {
    find,
    findByUserId,
    add
}