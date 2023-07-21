const CrudRepository = require('./crud-repository');
const { Show } = require('../models');
const { addRowLockOnShow } = require('./queries');

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
                    as: 'eventDetail',
                },
                {
                    model: Venue,
                    required: true,
                    as: 'venueDetails',
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }
}

module.exports = ShowRepository;