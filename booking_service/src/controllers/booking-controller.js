const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/commons');

async function createBooking(req, res) {
    try {
        console.log("body",req.body);
        const response = await BookingService.createBooking({
            showId: req.body.showId,
            userId: req.body.userId,
            noofSeats: req.body.noofSeats
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getBookings(req, res) {
    try {
        const response = await BookingService.getBookings();
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getBooking(req, res) {
    try {
        const response = await BookingService.getBooking({
            id: req.params.id
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function makePayment(req, res) {
    try {
        const response = await BookingService.makePayment({
            bookingId: req.params.id,
            cardNumber: req.body.cardNumber, 
            cardExpMonth: req.body.cardExpMonth,
            cardExpYear: req.body.cardExpYear,
            cardCVC: req.body.cardCVC, 
            country: req.body.country, 
            postalCode: req.body.postalCode, 
            amount: req.body.amount, 
            email: req.body.email
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}


module.exports = {
    createBooking,
    getBooking,
    getBookings,
    makePayment
}