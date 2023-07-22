const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/commons');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.eventId){
        ErrorResponse.message = 'Something went wrong while creating show';
        ErrorResponse.error = new AppError(['Event ID not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.venueId){
        ErrorResponse.message = 'Something went wrong while creating show';
        ErrorResponse.error = new AppError(['Venue ID not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.startTime){
        ErrorResponse.message = 'Something went wrong while creating show';
        ErrorResponse.error = new AppError(['Start Time not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.duration){
        ErrorResponse.message = 'Something went wrong while creating show';
        ErrorResponse.error = new AppError(['Duration not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong while creating show';
        ErrorResponse.error = new AppError(['Price not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validateUpdateSeatsRequest(req, res, next) {
    if(!req.body.seats) {
        ErrorResponse.message = 'Something went wrong while creating show';
        ErrorResponse.error = new AppError(['seats not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
}