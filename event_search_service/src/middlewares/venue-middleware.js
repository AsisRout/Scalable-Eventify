const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/commons');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating venues';
        ErrorResponse.error = new AppError(['Venue Name not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating venues';
        ErrorResponse.error = new AppError(['Venue City not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}