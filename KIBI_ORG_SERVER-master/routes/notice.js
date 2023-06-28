var express = require('express');
var router = express.Router();
const noticeController = require('../controllers/noticeController');
const middleware = require('../modules/middlewares');

router.get('/notice', middleware.userJwt, middleware.partyID, noticeController.notice);
router.put('/logout', middleware.userJwt, middleware.partyID, noticeController.logout);

module.exports = router;