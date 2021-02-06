const db = require('../../data/dbConfig');

function find() {
    return db('clients_classes');
}

function findByUserId(user_id) {
    return db('clients_classes as cC')
        .where({ user_id })
        .join('classes as c', 'c.id', '=', 'cC.class_id')
        .select('id', 'c.name as name', 'type as class_type', 'start_time', 'duration_hour', 'intensity_level', 'location', 'attendees_amt', 'max_class_size', 'cancelled');
}

async function add(user_id, class_id) {
    const [ client_class ] = await db('clients_classes').insert({ user_id, class_id }).returning('*');

    if (!client_class) {
        return Promise.resolve(null);
    }

    return Promise.resolve(client_class);
}

module.exports = {
    find,
    findByUserId,
    add
}