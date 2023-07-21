const axios = require('axios');
const { StatusCodes } = require('http-status-codes');

const { BookingRepository } = require('../repositories');
const { ServerConfig } = require('../config')
const db = require('../models');
const AppError = require('../utils/errors/app-error');

const stripeKey = process.env.STRIPE_KEY;
const stripe = require("stripe")(stripeKey);

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();

    try {
        const event = await axios.get(`${ServerConfig.EVENT_SERVICE}/api/v1/shows/${data.showId}`);
        const eventData = event.data.data;
        if (data.noofSeats > eventData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        const totalBillingAmount = data.noofSeats * eventData.price;
        const bookingPayload = { ...data, totalCost: totalBillingAmount };
        const booking = await bookingRepository.create(bookingPayload, transaction);

        await axios.patch(`${ServerConfig.EVENT_SERVICE}/api/v1/shows/${data.showId}/seats`, {
            seats: data.noofSeats
        });

        await transaction.commit();
        return booking;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }




};

async function makePayment(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
        if (bookingDetails.status == CANCELLED) {
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
        const cardToken = await stripe.tokens.create({
            card: {
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCVC,
                address_state: country,
                address_zip: postalCode,
            },
        });

        const charge = await stripe.charges.create({
            amount: amount,
            currency: "usd",
            source: cardToken.id,
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
        await transaction.rollback();
        throw error;
    }


};

async function cancelBooking(bookingId) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId, transaction);
        console.log(bookingDetails);
        if (bookingDetails.status == CANCELLED) {
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.EVENT_SERVICE}/api/v1/events/${bookingDetails.eventId}/seats`, {
            seats: bookingDetails.noofSeats,
            dec: 0
        });
        await bookingRepository.update(bookingId, { status: CANCELLED }, transaction);
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
    makePayment
}	