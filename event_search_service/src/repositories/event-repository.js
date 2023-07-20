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
};

module.exports = EventRepository;