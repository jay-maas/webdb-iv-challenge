const express = require('express')

const Ingredients = require('../models/ingredientsModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredients.find()
        res.status(200).json(ingredients)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',  validateIngredientsId, async (req, res) => {
    try {
        const ingredient = await Ingredients.findById(req.ingredient.id)
        res.status(200).json(ingredient)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', validateIngredient, async (req, res) => {
    try {
        const newIngredient = await Ingredients.add(req.validIngredient)
        res.status(201).json(newIngredient)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', validateIngredientsId, validateIngredient, async (req, res) => {
    try {
        const updatedIngredient = await Ingredients.update(req.ingredient.id, req.validIngredient)
        const numberUpdated = updatedIngredient
        res.status(200).json({ message: `Number of ingredient(s): ${numberUpdated}` })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateIngredientsId, async (req, res) => {
    try {
        const deleted = await Ingredients.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.use(express.json())

async function validateIngredientsId(req, res, next) {
    const ingredient = await Ingredients.findById(req.params.id)
    if (ingredient) {
        req.ingredient = ingredient
        next()
    } else {
        res.status(404).json({
            error: "Could not find a ingredient by that ID"
        })
    }
}

function validateIngredient(req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.name) {
            req.validIngredient = {
                name: req.body.name
            }
            next()
        } else {
            res.status(400).json({
                errorMessage: 'Missing required name. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing ingredient data.'
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