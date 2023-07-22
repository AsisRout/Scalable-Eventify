const axios = require('axios');
const { StatusCodes } = require('http-status-codes');

const { BookingRepository } = require('../repositories');
const { ServerConfig } = require('../config')
const db = require('../models');
const AppError = require('../utils/errors/app-error');
const { Enums } = require('../utils/commons');

const stripeKey = process.env.STRIPE_KEY;
const stripe = require("stripe")(stripeKey);

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();

    try {
        const show = await axios.get(`${ServerConfig.EVENT_SERVICE}/api/v1/shows/${data.showId}`);
        const showData = show.data.data;
        if (data.noofSeats > showData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        
        const totalBillingAmount = data.noofSeats * showData.price;
        const bookingPayload = { ...data, totalCost: totalBillingAmount };
        const booking = await bookingRepository.create(bookingPayload, transaction);

        console.log('SEAT-ID',data.noofSeats);

        await axios.patch(`${ServerConfig.EVENT_SERVICE}/api/v1/shows/${data.showId}/seats`, {
            seats: data.noofSeats
        });

        console.log('REQUEST')

        await transaction.commit();
        return booking;

    } catch (error) {
       // console.log(error);
        await transaction.rollback();
        throw error;
    }




};

async function getBookings(){
    try {
        const bookings = await bookingRepository.getAll();
        return bookings;
    } catch (error){
        console.log(error);
        throw new AppError('Cannot fetch data of all bookings', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getBooking(id){
    try {
        const venue = await bookingRepository.get(id);
        return venue;
    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The booking do not exists', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the booking', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


async function makePayment(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.getBooking(data.bookingId, transaction);
        if (bookingDetails.status == Enums.CANCELLED) {
            throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
        }
        console.log(bookingDetails);
        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();
        if (currentTime - bookingTime > 300000) {
            await cancelBooking(data.bookingId);
            throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
        }

        const { cardNumber, cardExpMonth, cardExpYear, cardCVC, country, postalCode, amount, email } = data;
        // const cardToken = await stripe.tokens.create({
        //     // card: {
        //     //     number: cardNumber,
        //     //     exp_month: cardExpMonth,
        //     //     exp_year: cardExpYear,
        //     //     cvc: cardCVC,
        //     //     address_state: country,
        //     //     address_zip: postalCode,
        //     // },
        // });
        const cardToken = 'tok_mastercard';

        const charge = await stripe.charges.create({
            amount: amount,
            currency: "usd",
            source: cardToken,
            receipt_email: email,
            description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
        });

        if (charge.status != "succeeded") {
            throw new AppError('Something went wrong will doing payment, Please Try Again later', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        //BOOKING COMPLETED
        await bookingRepository.update(data.bookingId, { status: BOOKED }, transaction);
        return charge;

    } catch (error) {
        console.log(error);
        await transaction.rollback();
        throw error;
    }


};

async function cancelBooking(bookingId) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId, transaction);
        if (bookingDetails.status == Enums.CANCELLED) {
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.EVENT_SERVICE}/api/v1/shows/${bookingDetails.showId}/seats`, {
            seats: bookingDetails.noofSeats,
            dec: 0
        });
        await bookingRepository.update(bookingId, { status: Enums.CANCELLED }, transaction);
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelOldBookings() {
    try {
        const time = new Date(Date.now() - 1000 * 300); // time 5 mins ago
        const response = await bookingRepository.cancelOldBookings(time);

        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createBooking,
    cancelOldBookings,
    cancelBooking,
    makePayment,
    getBookings,
    getBooking
}	