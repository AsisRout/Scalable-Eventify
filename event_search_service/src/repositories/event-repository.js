const CrudRepository = require('./crud-repository');
const { Event, Category } = require('../models');

class EventRepository extends CrudRepository {
    constructor(){
        super(Event);
    }

    getAllEvents(){
        const response = this.model.findAll({include: { model: Category}});
        return response;
    }

    async updateRemainingSeats(showId, seats, dec = true) {
        try {
            await db.sequelize.query(addRowLock(showId));
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
};

module.exports = EventRepository;