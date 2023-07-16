const express = require('express');

const eventRoutes =  require('./event-routes');
const categoryRoutes = require('./category-routes');

const router = express.Router();

router.use('/events', eventRoutes);

router.use('/categories', categoryRoutes);

module.exports = router;