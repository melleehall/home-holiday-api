const DashboardService = {
    getAllTrips(knex) {
        return knex.select('*').from('trips')
    }
}

module.exports = DashboardService