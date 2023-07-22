const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/commons');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.showId){
        ErrorResponse.message = 'Something went wrong while creating bookings';
        ErrorResponse.error = new AppError(['Show ID not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.userId){
        ErrorResponse.message = 'Something went wrong while creating bookings';
        ErrorResponse.error = new AppError(['User ID not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.noofSeats){
        ErrorResponse.message = 'Something went wrong while creating bookings';
        ErrorResponse.error = new AppError(['No of seats not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.totalCost){
        ErrorResponse.message = 'Something went wrong while creating bookings';
        ErrorResponse.error = new AppError(['Total Cost not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}