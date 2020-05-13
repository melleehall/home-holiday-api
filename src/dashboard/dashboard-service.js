const DashboardService = {
    getAllTrips(knex) {
        return knex.select('*').from('trips')
    },
    getAllTaken(knex) {
        return knex('trips').where('is_taken', true)
    }
}

module.exports = DashboardService