const { StatusCodes } = require('http-status-codes');

const { VenueService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/commons');

async function createVenue(req, res) {
    try {
        const event = await VenueService.createVenue({
            name: req.body.name,
            cityId: req.body.cityId,
            capacity: req.body.capacity
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


async function getVenues(req, res) {
    try {
        const categories = await VenueService.getVenues();
        SuccessResponse.data = categories;
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

async function getVenue(req, res) {
    try {
        const venue = await VenueService.getVenue(req.params.id);
        SuccessResponse.data = venue;
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
    createVenue,
    getVenues,
    getVenue
}