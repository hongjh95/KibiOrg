var express = require('express');
var router = express.Router();
const messageController = require('../controllers/messageController');
const middleware = require('../modules/middlewares');

router.get('/received/:pageNum', middleware.userJwt, middleware.partyID, messageController.received);
router.get('/sended/:pageNum', middleware.userJwt, middleware.partyID, messageController.sended);
router.get('/userList', middleware.userJwt, middleware.partyID, messageController.userList);
router.post('/write', middleware.userJwt, middleware.partyID, messageController.write);

module.exports = router;