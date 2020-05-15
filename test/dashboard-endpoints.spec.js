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

    describe(`GET /api/dashboard`, () => {
        context(`Given no trips`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/dashboard')
                    .expect(200, {totalCount: '0'})
            })

        })

        context('Given there are trips in the database', () => {
            const testTrips = makeTripsArray()

            beforeEach('insert articles', () => {
                return db
                    .into('trips')
                    .insert(testTrips)
            })

            it('GET /api/dashboard responds with 200 and the number of trips', () => {
                return supertest(app)
                    .get('/api/dashboard')
                    .expect(200, {totalCount: `${testTrips.length}`})

            })
        })
    })


    describe(`GET /api/dashboard/taken`, () => {
        context(`Given no trips`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/dashboard')
                    .expect(200, {totalCount: '0'})
            })

        })

        context('Given there are trips in the database', () => {
            // assuming for only one trip in fixtures is_taken = true
            const testTrips = makeTripsArray()

            beforeEach('insert articles', () => {
                return db
                    .into('trips')
                    .insert(testTrips)
            })

            it('GET /api/dashboard responds with 200 and the number of trips', () => {
                return supertest(app)
                    .get('/api/dashboard/taken')
                    .expect(200, {totalCount: '1'})

            })
        })
    })

})