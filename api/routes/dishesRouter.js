const express = require('express')

const dishesModel = require('../models/dishesModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const dishes = await dishesModel.find()
        res.status(200).json(dishes)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',  validateDishId, async (req, res) => {
    try {
        const dish = await dishesModel.findById(req.dish.id)
        res.status(200).json(dish)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id/recipes',  validateDishId, async (req, res) => {
    try {
        const dish = await dishesModel.findById(req.dish.id)
        const recipes = await dishesModel.findRecipesById(req.dish.id)
        const recipesList = {
            name: dish.name,
            description: dish.description,
            recipes: recipes
        }
        res.status(200).json(recipesList)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', validateDish, async (req, res) => {
    try {
        const newDish = await dishesModel.add(req.validDish)
        res.status(201).json(newDish)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', validateDishId, validateDish, async (req, res) => {
    try {
        const updatedDish = await dishesModel.update(req.dish.id, req.validDish)
        const numberUpdated = updatedDish
        res.status(200).json({ message: `Number of dish(s): ${numberUpdated}` })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateDishId, async (req, res) => {
    try {
        const deleted = await dishesModel.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.use(express.json())

async function validateDishId(req, res, next) {
    const dish = await dishesModel.findById(req.params.id)
    if (dish) {
        req.dish = dish
        next()
    } else {
        res.status(404).json({
            error: "Could not find a dish by that ID"
        })
    }
}

function validateDish(req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.name && req.body.description) {
            req.validDish = {
                name: req.body.name,
                description: req.body.description
            }
            next()
        } else {
            res.status(400).json({
                errorMessage: 'Missing required name or description. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing dish data.'
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