const express = require('express');

const router = express.Router();

const controller = require('../controller/user')

const {addFir , findFirByUserId} = require('../controller/fir')

const {addEvent,findEventByUserId} = require('../controller/event')

const {addComplain,findComplainByUserId} = require('../controller/complain')

router.param("userId",controller.getUserById)

router.post('/login', controller.signin);

router.post('/signup', controller.signup);

router.post('/logout', controller.signout);

router.post('/getall',controller.getAllUsers)

router.post('/:userId/update',controller.updateUser)

router.post('/:userId/addFir',addFir)

router.post('/:userId/myfirs',findFirByUserId)

router.post('/:userId/addEvent',addEvent)

router.post('/:userId/myevents',findEventByUserId)

router.post('/:userId/addComplain',addComplain)

router.post('/:userId/mycomplains',findComplainByUserId)

module.exports = router;