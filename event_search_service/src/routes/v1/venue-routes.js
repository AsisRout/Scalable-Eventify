const express = require('express');
const { S } = require('../../middlewares');
const { VenueController } = require('../../controllers');

const router = express.Router();

router.post('/', VenueMiddlewares.validateCreateRequest, VenueController.createVenue);

router.get('/', VenueController.getVenues);

router.get('/:id', VenueController.getVenue);

module.exports = router;