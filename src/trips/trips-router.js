const express = require('express')
const xss = require('xss')
const TripsService = require('./trips-service')

const tripsRouter = express.Router()
const jsonParser = express.json()

const serializeTrip = trip => ({
    id: trip.id,
    trip_name: xss(trip.trip_name),
    description: xss(trip.description),
    element_one: xss(trip.element_one),
    sense_one: xss(trip.sense_one), 
    element_two: xss(trip.element_two), 
    sense_two: xss(trip.sense_two), 
    element_three: xss(trip.element_three), 
    sense_three: xss(trip.sense_three), 
    element_four: xss(trip.element_four), 
    sense_four: xss(trip.sense_four), 
    element_five: xss(trip.element_five), 
    sense_five: xss(trip.sense_five)
  })

tripsRouter
    .route('/')
    .get((req, res, next) => {
        TripsService.getAllTrips(
            req.app.get('db')
        )
        .then(trips => {
            res
                .status(200)
                .json(trips.map(serializeTrip))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { trip_name, description, element_one, sense_one, element_two, sense_two, element_three, sense_three, element_four, sense_four, element_five, sense_five } = req.body
        const newTrip = { trip_name, description, element_one, sense_one, element_two, sense_two, element_three, sense_three, element_four, sense_four, element_five, sense_five }

        for (const [key, value] of Object.entries(newTrip)) {
            if (value == null) {
              return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
              })
            }
        }

        TripsService.insertTrip(
            req.app.get('db'),
            newTrip
        )
            .then(trip => {
                res 
                    .status(201)
                    .location(`/api/trips/${trip.id}`)
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
                trip_name: xss(res.trip.trip_name),
                description: xss(res.trip.description),
                element_one: xss(res.trip.element_one),
                sense_one: xss(res.trip.sense_one),
                element_two: xss(res.trip.element_two),
                sense_two: xss(res.trip.sense_two),
                element_three: xss(res.trip.element_three),
                sense_three: xss(res.trip.sense_three),
                element_four: xss(res.trip.element_four),
                sense_four: xss(res.trip.sense_four),
                element_five: xss(res.trip.element_five),
                sense_five: xss(res.trip.sense_five)
            })
    })
    .delete((req, res, next) => {
        TripsService.deleteTrip(
            req.app.get('db'),
            req.params.trip_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })



module.exports = tripsRouter