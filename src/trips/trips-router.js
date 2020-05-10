const express = require('express')
const xss = require('xss')
const TripsService = require('./trips-service')

const tripsRouter = express.Router()
const jsonParser = express.json()

tripsRouter
    .route('/')
    .get((req, res, next) => {
        TripsService.getAllTrips(
            req.app.get('db')
        )
        .then(trips => {
            res.json(trips)
        })
        .catch(next)
    })



module.exports = tripsRouter