const express = require('express')
const xss = require('xss')
const TripsService = require('./trips-service')

const tripsRouter = express.Router()
const jsonParser = express.json()

const serializeTrip = trip => ({
    id: trip.id,
    trip_name: xss(trip.trip_name),
    description: xss(trip.description),
    element_one: xss(res.trip.element_one),
    sense_one: xss(res.trip.sense_one),
    resource_one: xss(res.trip.resource_one),
    element_two: xss(res.trip.element_two),
    sense_two: xss(res.trip.sense_two),
    resource_two: xss(res.trip.resource_two),
    element_three: xss(res.trip.element_three),
    sense_three: xss(res.trip.sense_three),
    resource_three: xss(res.trip.resource_three),
    element_four: xss(res.trip.element_four),
    sense_four: xss(res.trip.sense_four),
    resource_four: xss(res.trip.resource_four),
    element_five: xss(res.trip.element_five),
    sense_five: xss(res.trip.sense_five),
    resource_five: xss(res.trip.resource_five),
    is_taken: false,
    kudos: res.trip.kudos
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
                .json(trips)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { trip_name, description, element_one, sense_one, resource_one, element_two, sense_two, resource_two, element_three, sense_three, resource_three, element_four, sense_four, resource_four, element_five, sense_five, resource_five } = req.body
        const newTrip = { trip_name, description, element_one, sense_one, resource_one, element_two, sense_two, resource_two, element_three, sense_three, resource_three, element_four, sense_four, resource_four, element_five, sense_five, resource_five }

        for (const [key, value] of Object.entries(newTrip)) {
            if (value == null) {
              return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
              })
            }
        }
        newTrip.is_taken = false
        newTrip.kudos = 0

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
                resource_one: xss(res.trip.resource_one),
                element_two: xss(res.trip.element_two),
                sense_two: xss(res.trip.sense_two),
                resource_two: xss(res.trip.resource_two),
                element_three: xss(res.trip.element_three),
                sense_three: xss(res.trip.sense_three),
                resource_three: xss(res.trip.resource_three),
                element_four: xss(res.trip.element_four),
                sense_four: xss(res.trip.sense_four),
                resource_four: xss(res.trip.resource_four),
                element_five: xss(res.trip.element_five),
                sense_five: xss(res.trip.sense_five),
                resource_five: xss(res.trip.resource_five),
                is_taken: res.trip.is_taken,
                kudos: res.trip.kudos
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
    .patch(jsonParser, (req, res, next) => {
        const { is_taken, kudos } = req.body
        const tripToUpdate = { is_taken, kudos }
        let columnToUpdate;
        const numberOfValues = Object.values(tripToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                message: `Request body must contain either 'is_taken' or 'kudos'`
                }
            })
        }  else if (numberOfValues > 1) {
            return res.status(400).json({
                error: {
                message: `Request body must only contain 'is_taken' or 'kudos' - not both.`
                }
            })
        } else if (kudos) {
            columnToUpdate = 'kudos'
        } else {
            columnToUpdate = 'is_taken'
        }

        TripsService.updateTrip(
            req.app.get('db'),
            req.params.trip_id,
            columnToUpdate,
            tripToUpdate
        )
        .then(newValue => {
            res.json(newValue)
        })
        .catch(next)
    })


module.exports = tripsRouter