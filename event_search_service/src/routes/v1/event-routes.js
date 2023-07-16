const express = require('express');
const { EventMiddlewares } = require('../../middlewares');
const { EventController } = require('../../controllers');

const router = express.Router();

router.post('/', EventMiddlewares.validateCreateRequest, EventController.createEvent);

router.get('/', EventController.getEvents);

router.get('/:id', EventController.getEvent);

module.exports = router;