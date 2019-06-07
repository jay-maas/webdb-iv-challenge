const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findRecipesById,
    add,
    update,
    remove
}

function find() {
    return db('dishes')
}

function findById(id) {
    return db('dishes')
        .where({ id })
        .first()
}

function findRecipesById(dishId) {
    return db('recipes')
        .join('dishes', 'recipes.dish_id', 'dishes.id')
        .select('recipes.name as name', 'recipes.description as description')
        .where({ dish_id: dishId})
}

async function add(dish) {
    const [id] = await db('dishes').insert(dish)

    return findById(id)
}

function update(id, changes) {
    return db('dishes')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('dishes')
        .where({ id })
        .del()
}