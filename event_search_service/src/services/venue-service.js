const { VenueRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const venueRepository = new VenueRepository();

async function createVenue(data){
    try{
        const response = await venueRepository.create(data);
        return response;
    }
    catch(error){
        if(error.name == 'SequelizeValidationError') {
            let explanations = [];
            error.errors.forEach((err) => {
                explanations.push(err.message);
            });
            throw new AppError(explanations, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Event Venue', StatusCodes.INTERNAL_SERVER_ERROR);

    }
};

async function getVenues(){
    try {
        const venues = await venueRepository.getAll();
        return venues;
    } catch (error){
        console.log(error);
        throw new AppError('Cannot fetch data of all venues', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getVenue(id){
    try {
        const venue = await venueRepository.get(id);
        return venue;
    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The venue do not exists', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the venue', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


module.exports = {
    createVenue,
    getVenue,
    getVenues
};