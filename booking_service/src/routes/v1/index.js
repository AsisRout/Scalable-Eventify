const express = require('express');

const { InfoController, BookingController } = require('../../controllers');

const router = express.Router();

router.post('/bookings', BookingController.createBooking);

module.exports = router;