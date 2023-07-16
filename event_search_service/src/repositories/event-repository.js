const CrudRepository = require('./crud-repository');
const { Event } = require('../models');

class EventRepository extends CrudRepository {
    constructor(){
        super(Event);
    }
};

module.exports = EventRepository;