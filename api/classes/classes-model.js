const db = require('../../data/dbConfig');

function find() {
    return db('classes');
}

function findById(id) {
    return db('classes').where({ id }).first();
}

// Returns a promise that resolves to a single class obj. Pass an object with the necessary search parameters as properties e.g { id: 1, name: "Yoga 101" }
function findBy(...property) {
    return db('classes').where(property[0]);
}

async function add(classData) {
    const [ newClass ] = await db('classes').insert(classData).returning('*');
    console.log(newClass);

    if (!newClass) {
        return Promise.resolve(null);
    }

    return Promise.resolve(newClass);
}

// Returns a promise that resolves to true if successfully removed
async function remove(id) {
    const delRecords = await db('classes').where({ id }).del();

    if (!delRecords || delRecords <= 0) {
        return Promise.resolve(null);
    }

    return Promise.resolve(true);
}

// Returns a promise that resolves to true if successfully changed
async function update(id, changes) {
    const [ updatedClass ] = await db('classes').where({ id }).update(changes).returning('*');

    if (!updatedClass) {
        return Promise.resolve(null);
    }

    return Promise.resolve(updatedClass);
}

module.exports = {
    find,
    findById,
    findBy,
    add,
    remove,
    update
}