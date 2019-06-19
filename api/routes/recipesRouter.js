const express = require('express')

const Recipes = require('../models/recipesModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipes.find()
        res.status(200).json(recipes)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',  validateRecipeId, async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.recipe.id)
        res.status(200).json(recipe)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id/ingredients',  validateRecipeId, async (req, res) => {
    try {
        const ingredientsList = await Recipes.findIngredientsById(req.recipe.id)
        const dish = await Recipes.findDishesById(req.recipe.id)
        const recipe = await Recipes.findById(req.recipe.id)
        const shoppingList = {
            dish_name: dish.name,
            recipe_name: recipe.name,
            ingredients: ingredientsList
        }
        res.status(200).json(shoppingList)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', validateRecipe, async (req, res) => {
    try {
        const newRecipe = await Recipes.add(req.recipeValid)
        res.status(201).json(newRecipe)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', validateRecipeId, validateRecipe, async (req, res) => {
    try {
        const updatedRecipe = await Recipes.update(req.recipe.id, req.recipeValid)
        const numberUpdated = updatedRecipe
        res.status(200).json({ message: `Number of recipe(s): ${numberUpdated}` })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateRecipeId, async (req, res) => {
    try {
        const deleted = await Recipes.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.use(express.json())

async function validateRecipeId(req, res, next) {
    const recipe = await Recipes.findById(req.params.id)
    if (recipe) {
        req.recipe = recipe
        next()
    } else {
        res.status(404).json({
            error: "Could not find a recipe by that ID"
        })
    }
}

function validateRecipe(req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.name && req.body.dish_id && req.body.description && req.body.instructions) {
            req.recipeValid = {
                name: req.body.name,
                dish_id: req.body.dish_id,
                description: req.body.description,
                instructions: req.body.instructions
            }
            next()
        } else {
            res.status(400).json({
                errorMessage: 'Missing required name, dish_id, description, or instructions. This schema requires both. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing recipe data.'
        })
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)
        )
            return false
    }
    return true
}

module.exports = router