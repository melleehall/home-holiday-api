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

            it('GET /api/trips/:trip_id responds with 200 and the specified trip', () => {
                const tripId = 1
                const expectedTrip = testTrips[tripId - 1]
                return supertest(app)
                    .get(`/api/trips/${tripId}`)
                    .expect(200, expectedTrip)
            })
        })
    })

    describe(`PATCH /api/trips/:trip_id`, () => {
        context('Given no trips', () => {
            it(`responds with 404`, () => {
                const tripId = 8203
                return supertest(app)
                    .patch(`/api/trips/${tripId}`)
                    .expect(404, { error: { message: `Trip does not exist` }} )
            })
        })

        context('Given there are trips in the database', () => {
            const testTrips = makeTripsArray()

            beforeEach('insert trips', () => {
                return db
                    .into('trips')
                    .insert(testTrips)
            })

            it(`responds with 204 and updates the trip`, () => {
                const idToUpdate = 1
                const updateTrip = {
                    is_taken: true
                }
                const expectedTrip = {
                    ...testTrips[idToUpdate - 1],
                    ...updateTrip
                }
                return supertest(app)
                    .patch(`/api/trips/${idToUpdate}`)
                    .send(updateTrip)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get(`/api/trips/${idToUpdate}`)
                            .expect(expectedTrip)    
                    )
            })
        })
    })

    describe(`POST /api/trips`, () => {
        it(`creates a trip, responding with 201 and the new trip`, () => {
            const testTrips = makeTripsArray()
            const newTrip = testTrips[0]

            return supertest(app)
                .post('/api/trips')
                .send(newTrip)
                .expect(201)
                .expect(res => {
                    expect(res.body.trip_name).to.eql(newTrip.trip_name)
                    expect(res.body.description).to.eql(newTrip.description)
                    expect(res.body.element_one).to.eql(newTrip.element_one)
                    expect(res.body.sense_one).to.eql(newTrip.sense_one)
                    expect(res.body.resource_one).to.eql(newTrip.resource_one)
                    expect(res.body.element_two).to.eql(newTrip.element_two)
                    expect(res.body.sense_two).to.eql(newTrip.sense_two)
                    expect(res.body.resource_two).to.eql(newTrip.resource_two)
                    expect(res.body.element_three).to.eql(newTrip.element_three)
                    expect(res.body.sense_three).to.eql(newTrip.sense_three)
                    expect(res.body.resource_three).to.eql(newTrip.resource_three)
                    expect(res.body.element_four).to.eql(newTrip.element_four)
                    expect(res.body.sense_four).to.eql(newTrip.sense_four)
                    expect(res.body.resource_four).to.eql(newTrip.resource_four)
                    expect(res.body.element_five).to.eql(newTrip.element_five)
                    expect(res.body.sense_five).to.eql(newTrip.sense_five)
                    expect(res.body.resource_five).to.eql(newTrip.resource_five)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/trips/${res.body.id}`)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/trips/${postRes.body.id}`)
                        .expect(postRes.body)
                )
        })
    })

    describe(`DELETE /api/trips/:trip_id`, () => {
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

            beforeEach('insert trips', () => {
                return db
                    .into('trips')
                    .insert(testTrips)
            })

            it('responds with 204 and removes the trip', () => {
                const idToRemove = 2
                const expectedTrips = testTrips.filter(trip => trip.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/trips/${idToRemove}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/trips`)
                            .expect(expectedTrips)    
                    )
            })
        })
    })

})