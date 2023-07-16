const { StatusCodes } = require('http-status-codes');

const { EventService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/commons');

async function createEvent(req, res) {
    try {
        const event = await EventService.createEvent({
            name: req.body.name,
            description: req.body.description,
            interested_count: req.body.interested_count
        });
        SuccessResponse.data = event;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


async function getEvents(req, res) {
    try {
        const events = await EventService.getEvents();
        SuccessResponse.data = events;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getEvent(req, res) {
    try {
        const events = await EventService.getEvent(req.params.id);
        SuccessResponse.data = events;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEvent
}