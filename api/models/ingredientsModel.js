const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('ingredients')
}

function findById(id) {
    return db('ingredients')
        .where({ id })
        .first()
}

async function add(ingredient) {
    const [id] = await db('ingredients').insert(ingredient)

    return findById(id)
}

function update(id, changes) {
    return db('ingredients')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('ingredients')
        .where({ id })
        .del()
}