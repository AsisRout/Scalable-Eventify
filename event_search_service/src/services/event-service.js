const { EventRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const eventRepository = new EventRepository();

async function createEvent(data){
    try{
        const response = await eventRepository.create(data);
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
        throw new AppError('Cannot create a new Event', StatusCodes.INTERNAL_SERVER_ERROR);

    }
};

async function getEvents(){
    try {
        const events = await eventRepository.getAll();
        return events;
    } catch (error){
        throw new AppError('Cannot fetch data of all events', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getEvent(id){
    try {
        const event = await eventRepository.get(id);
        return event;
    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The event do not exists', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the event', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createEvent,
    getEvent,
    getEvents
};