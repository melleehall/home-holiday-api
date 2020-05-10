const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeTripsArray } = require('./trips.fixtures')

describe('Trips Endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('trips').truncate())

    afterEach('cleanup', () => db('trips').truncate())

    describe(`GET /api/trips`, () => {
        context(`Given no trips`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/trips')
                    .expect(200, [])
            })
        })

        context('Given there are trips in the database', () => {
            const testTrips = makeTripsArray()

            beforeEach('insert articles', () => {
                return db
                    .into('trips')
                    .insert(testTrips)
            })

            it('GET /api/trips responds with 200 and all of the trips', () => {
                return supertest(app)
                    .get('/api/trips')
                    .expect(200, testTrips)

            })
        })
    })

    describe(`GET /api/trips/:trip_id`, () => {
        context(`Given no trips`, () => {
            it(`responds with 404`, () => {
                const tripId = 321
                return supertest(app)
                    .get(`/api/trips/${tripId}`)
                    .expect(404, { error: { message: `Trip does not exist`} })
            })
        })

        context('Given there are trips in the database', () => {
            const testTrips = makeTripsArray()

            beforeEach('insert articles', () => {
                return db
                    .into('trips')
                    .insert(testTrips)
            })

            it('GET /api/trips/trip_id responds with 200 and the specified trip', () => {
                const tripId = 1
                const expectedTrip = testTrips[tripId - 1]
                return supertest(app)
                    .get(`/api/trips/${tripId}`)
                    .expect(200, expectedTrip)
            })
        })
    })
})