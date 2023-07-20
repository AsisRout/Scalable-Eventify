const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/commons');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.eventId){
        ErrorResponse.message = 'Something went wrong while creating events';
        ErrorResponse.error = new AppError(['Event ID not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.venueId){
        ErrorResponse.message = 'Something went wrong while creating events';
        ErrorResponse.error = new AppError(['Venue ID not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.startTime){
        ErrorResponse.message = 'Something went wrong while creating events';
        ErrorResponse.error = new AppError(['Start Time not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.duration){
        ErrorResponse.message = 'Something went wrong while creating events';
        ErrorResponse.error = new AppError(['Duration not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}