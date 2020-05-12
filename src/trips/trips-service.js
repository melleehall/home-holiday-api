const TripsService = {
    getAllTrips(knex) {
        return knex.select('*').from('trips')
    },
    getById(knex, id) {
        return knex.from('trips').select('*').where('id', id).first()
    },
    insertTrip(knex, newTrip) {
        return knex
            .insert(newTrip)
            .into('trips')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteTrip(knex, id) {
        return knex('trips')
            .where({ id })
            .delete()
    },
    updateTrip(knex, id, newTripFields) {
        return knex('trips')
            .where({ id })
            .update(newTripFields)
    }
}

module.exports = TripsService