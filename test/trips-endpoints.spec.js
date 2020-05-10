const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')


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

    // before('clean the table', () => db('trips').truncate())

    context('Given there are trips in the database', () => {
        const testTrips = [
            {
                id: 1,
                trip_name: 'France',
                description: 'A trip to France!',
                element_one: 'Element one',
                sense_one: 'See',
                element_two: 'Element two',
                sense_two: 'Touch',
                element_three: 'Element three',
                sense_three: 'Taste',
                element_four: 'Element four',
                sense_four: 'Hear',
                element_five: 'Element five',
                sense_five: 'Smell',
            },
            {
                id: 2,
                trip_name: 'Underwater',
                description: 'A trip under the sea!',
                element_one: 'Great Barrier Reef',
                sense_one: 'See',
                element_two: 'Lush salt scrub',
                sense_two: 'Touch',
                element_three: 'Miso soup',
                sense_three: 'Taste',
                element_four: 'Sounds of the sea',
                sense_four: 'Hear',
                element_five: 'Saltaire candle from Mer Sea',
                sense_five: 'Smell',
            }
        ];

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