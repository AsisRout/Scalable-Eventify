const { ShowRepository, EventRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const showRepository = new ShowRepository();

async function createShow(data){
    try{
        const response = await showRepository.create(data);
        return response;
    }
    catch(error){
        console.log(error);
        if(error.name == 'SequelizeValidationError') {
            let explanations = [];
            error.errors.forEach((err) => {
                explanations.push(err.message);
            });
            throw new AppError(explanations, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Show', StatusCodes.INTERNAL_SERVER_ERROR);

    }
};

async function getShows(query){
    let customFilter = {};
    let sortFilter = [];
    const endingShowTime = " 23:59:00";
    // CITY=Delhi
    if(query.city) {
       customFilter.cityId =  query.city;
    }
    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]
        }
    }
    if(query.tickets) {
        customFilter.totalSeats = {
            [Op.gte]: query.tickets
        }
    }
    if(query.showDate) {
        customFilter.startTime = {
            [Op.between]: [query.showDate, query.showDate + endingShowTime]
        }
    }
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }

    try {
        const shows = await showRepository.getAllShows(customFilter, sortFilter);
        return shows;
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the shows', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getShow(id){
    try {
        const show = await showRepository.get(id);
        return show;
    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The show do not exists', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the show', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function deleteShow(id) {
    try {
        const response = await showRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The show you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot delete the show', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateShow(id) {
    try {
        const response = await showRepository.update(id);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The show you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot delete the show', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
    try {
        const response = await showRepository.updateRemainingSeats(data.showId, data.seats, data.dec);
        return response;
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot update data of the show', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createShow,
    getShow,
    getShows,
    deleteShow,
    updateSeats,
    updateShow
};