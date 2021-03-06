require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const {CLIENT_ORIGIN} = require('./config')
const tripsRouter = require('./trips/trips-router')
const dashboardRouter = require('./dashboard/dashboard-router')

const app = express()
const jsonParser = express.json()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common'))
app.use(helmet())
app.use(cors())

app.use(
    cors({
      origin: CLIENT_ORIGIN
    })
);

app.use('/api/trips', tripsRouter)
app.use('/api/dashboard', dashboardRouter)

app.get('/', (req, res) => {
    res
      .status(200)
      .send('Hello, world!  See API documentation here: https://github.com/melleehall/home-holiday-api')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app
