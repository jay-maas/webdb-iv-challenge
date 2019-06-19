const express = require('express');
const timestamp = require('time-stamp')

const dishesRouter = require('./routes/dishesRouter.js')
const ingredientsRouter = require('./routes/ingredientsRouter.js')
const recipesRouter = require('./routes/recipesRouter.js')

const server = express();

server.use(logger)
server.use('/api/dishes', dishesRouter)
server.use('/api/ingredients', ingredientsRouter)
server.use('/api/recipes', recipesRouter)


server.get('/', (req, res) => {
    res.send(`
    <div style="display: flex; align-items: center;">
        <p style="margin: 0;">This project was deployed by:</p>
        <h2 style="margin: 0;"> ${process.env.DEPLOYER}</h2>
    </div>
    <p>Message of the Day: ${process.env.MOTD}</p>
    <p>Extra: ${process.env.OTHER_STUFF}</p>
    `)
})

function logger(req, res, next) {
    console.log(`A ${req.method} request to ${req.url} at ${timestamp.utc('HH:mm:ss on MM/DD/YYYY')}`)
    next()
}

module.exports = server;