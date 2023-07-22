const CrudRepository = require('./crud-repository');
const { Show, Venue, Event, City } = require('../models');

class ShowRepository extends CrudRepository {
    constructor() {
        super(Show);
    }

    async getAllShows(filter, sort) {
        const response = await Show.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Event,
                    required: true,
                },
                {
                    model: Venue,
                    required: true,
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(showId, seats, dec = true) {
        try {
            const show = await this.model.findByPk(showId);
            if(+dec) {
                await show.decrement('totalSeats', {by: seats});
            } else {
                await show.increment('totalSeats', {by: seats});
            }
            return show;
        } catch(error) {
            throw error;
        }
       
    }
}

module.exports = ShowRepository;