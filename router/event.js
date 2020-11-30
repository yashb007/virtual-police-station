const express = require('express');
const router = express.Router();

const middle = require('../controller/midlleware')
const controller = require('../controller/event')

router.param("eventId", controller.getEventById )
router.post('/getall', controller.getAllEvents);


module.exports = router;

