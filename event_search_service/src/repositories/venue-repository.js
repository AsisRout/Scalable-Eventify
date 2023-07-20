const CrudRepository = require('./crud-repository');
const { Venue } = require('../models');

class VenueRepository extends CrudRepository {
    constructor(){
        super(Venue);
    }
}

module.exports = VenueRepository;