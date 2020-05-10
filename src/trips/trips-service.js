const TripsService = {
    getAllTrips(knex) {
        return knex.select('*').from('trips')
    },
}

module.exports = TripsService