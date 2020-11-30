const express = require('express');
const router = express.Router();

const middle = require('../controller/midlleware')
const controller = require('../controller/fir')

router.param("firId", controller.getFirById )
router.post('/getall', controller.getAllFirs);


module.exports = router;

