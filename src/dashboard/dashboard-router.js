const express = require('express')
const xss = require('xss')
const DashboardService = require('./dashboard-service')

const dashboardRouter = express.Router()
const jsonParser = express.json()

dashboardRouter
    .route('/')
    .get((req, res, next) => {
        DashboardService.getAllTrips(
            req.app.get('db')
        )
        .then(trips => {
            let count = 0
            trips.forEach(trip => count+=1)
            res
                .status(200)
                .json({totalCount: `${count}`})
        })
        .catch(next)
    })

dashboardRouter
    .route('/taken')
    .get((req, res, next) => {
        DashboardService.getAllTaken(
            req.app.get('db')
        )
        .then(trips => {
            let count = 0
            trips.forEach(trip => count+=1)
            res 
                .status(200)
                .json({totalCount: `${count}`})
        })
        .catch(next)
    })

module.exports = dashboardRouter