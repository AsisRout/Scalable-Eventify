const express = require('express');

const eventRoutes =  require('./event-routes');

const router = express.Router();

router.use('/events', eventRoutes);

module.exports = router;