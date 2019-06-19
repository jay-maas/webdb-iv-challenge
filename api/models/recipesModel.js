const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findIngredientsById,
    findDishesById,
    add,
    update,
    remove
}

function find() {
    return db('recipes')
}

function findById(id) {
    return db('recipes')
        .where({ id })
        .first()
}

function findIngredientsById(recipeId) {
    return db('recipe_ingredients')
        .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
        .select('recipe_ingredients.quantity', 'recipe_ingredients.quantity_unit', 'ingredients.name')
        .where({ recipe_id: recipeId })
}

function findDishesById(recipeId) {
    return db('dishes')
        .select('dishes.name')
        .where({ id: recipeId})
        .first()
}

async function add(recipe) {
    const [id] = await db('recipes').insert(recipe)

    return findById(id)
}

function update(id, changes) {
    return db('recipes')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('recipes')
        .where({ id })
        .del()
}