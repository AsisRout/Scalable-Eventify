const CrudRepository = require('./crud-repository');
const { Show } = require('../models');

class ShowRepository extends CrudRepository {
    constructor(){
        super(Show);
    }
}

module.exports = ShowRepository;