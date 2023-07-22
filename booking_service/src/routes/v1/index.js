const express = require('express');

const { BookingController } = require('../../controllers');

const { BookingMiddlewares } = require('../../middlewares');


const router = express.Router();

router.post('/bookings', BookingMiddlewares.validateCreateRequest, BookingController.createBooking);

router.get('/bookings', BookingController.getBookings);

router.get('/bookings/:id', BookingController.getBooking);

router.post('/bookings/:id/payment', BookingController.makePayment);


module.exports = router;