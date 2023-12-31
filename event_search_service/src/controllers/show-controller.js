const { StatusCodes } = require('http-status-codes');

const { ShowService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/commons');

async function createShow(req, res) {
    try {
        const event = await ShowService.createShow({
            eventId: req.body.eventId,
            venueId: req.body.venueId,
            startTime: req.body.startTime,
            duration: req.body.duration,
            price: req.body.price,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = event;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


async function getShows(req, res) {
    try {
        const shows = await ShowService.getShows(req.query);
        SuccessResponse.data = shows;
        return res
               .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
               .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getShow(req, res) {
    try {
        const show = await ShowService.getShow(req.params.id);
        SuccessResponse.data = show;
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

async function updateSeats(req, res) {
    try {
        const response = await ShowService.updateSeats({
            showId: req.params.id,
            seats: req.body.seats, 
            dec: req.body.dec
        });
        SuccessResponse.data = response;
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


async function updateShow(req, res) {
    try {
        const response = await ShowService.updateShow(req.params.id);
        SuccessResponse.data = response;
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
    createShow,
    getShows,
    getShow,
    updateSeats,
    updateShow
}