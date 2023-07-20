const express = require('express');
const { ShowMiddlewares} = require('../../middlewares');
const { ShowController } = require('../../controllers');

const router = express.Router();

router.post('/', ShowMiddlewares.validateCreateRequest, ShowController.createShow);

router.get('/', ShowController.getShows);

router.get('/:id', ShowController.getShow);

module.exports = router;

