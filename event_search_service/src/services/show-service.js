const { ShowRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const showRepository = new ShowRepository();

async function createShow(data){
    try{
        const response = await showRepository.create(data);
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
        throw new AppError('Cannot create a new Show', StatusCodes.INTERNAL_SERVER_ERROR);

    }
};

async function getShows(){
    try {
        const shows = await showRepository.getAll();
        return shows;
    } catch (error){
        console.log(error);
        throw new AppError('Cannot fetch data of all shows', StatusCodes.INTERNAL_SERVER_ERROR);
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

module.exports = {
    createShow,
    getShow,
    getShows,
    deleteShow
};