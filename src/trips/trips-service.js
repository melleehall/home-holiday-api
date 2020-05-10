const TripsService = {
    getAllTrips(knex) {
        return knex.select('*').from('trips')
    },
    getById(knex, id) {
        return knex.from('trips').select('*').where('id', id).first()
    }
}

module.exports = TripsService