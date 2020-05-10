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
            res
                .status(200)
                .json(trips)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { trip_name, description, element_one, sense_one, element_two, sense_two, element_three, sense_three, element_four, sense_four, element_five, sense_five } = req.body
        const newTrip = { trip_name, description, element_one, sense_one, element_two, sense_two, element_three, sense_three, element_four, sense_four, element_five, sense_five }

        TripsService.insertTrip(
            req.app.get('db'),
            newTrip
        )
            .then(trip => {
                res 
                    .status(201)
                    .json(trip)
            })
            .catch(next)
        })

tripsRouter
    .route('/:trip_id')
    .all((req, res,next) => {
        TripsService.getById(
            req.app.get('db'),
            req.params.trip_id
        )
        .then(trip => {
            if (!trip) {
                return res.status(404).json({
                    error: { message: `Trip does not exist`}
                })
            }
            res.trip = trip //save the trip for the next middleware
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res
            .status(200)
            .json({
                id: res.trip.id,
                trip_name: res.trip.trip_name,
                description: res.trip.description,
                element_one: res.trip.element_one,
                sense_one: res.trip.sense_one,
                element_two: res.trip.element_two,
                sense_two: res.trip.sense_two,
                element_three: res.trip.element_three,
                sense_three: res.trip.sense_three,
                element_four: res.trip.element_four,
                sense_four: res.trip.sense_four,
                element_five: res.trip.element_five,
                sense_five: res.trip.sense_five
            })
    })



module.exports = tripsRouter