var express = require('express');
var router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const middleware = require('../modules/middlewares');

router.get('/getScheduleList', middleware.userJwt, middleware.partyID, scheduleController.scheduleList);
router.get('/getScheduleUser', middleware.userJwt, middleware.partyID, scheduleController.scheduleUser); 
router.get('/getScheduleUserCount', middleware.partyID, scheduleController.scheduleUserCount);

module.exports = router;