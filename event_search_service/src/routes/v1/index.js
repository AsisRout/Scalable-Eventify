const express = require('express');

const eventRoutes =  require('./event-routes');
const categoryRoutes = require('./category-routes');
const showRoutes = require('./show-routes');
const venueRoutes = require('./venue-routes');

const router = express.Router();

router.use('/events', eventRoutes);

router.use('/categories', categoryRoutes);

router.use('/venues', venueRoutes);

router.use('/shows', showRoutes);


module.exports = router;