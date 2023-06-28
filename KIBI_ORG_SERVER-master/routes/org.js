var express = require('express');
var router = express.Router();
const orgController = require('../controllers/orgController');
const middleware = require('../modules/middlewares');

router.get('/list', middleware.userJwt, middleware.partyID, orgController.list);
router.get('/attend', middleware.userJwt, middleware.partyID, middleware.dateTime, orgController.attend);
router.get('/journal', middleware.userJwt, middleware.partyID, middleware.dateTime, orgController.journal);
router.post('/comment', middleware.userJwt, middleware.partyID, orgController.comment);
router.get('/commentRead', middleware.userJwt, middleware.partyID, orgController.commentRead);

module.exports = router;