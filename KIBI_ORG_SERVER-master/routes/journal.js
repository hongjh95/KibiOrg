var express = require('express');
var router = express.Router();
const journalController = require('../controllers/journalController');
const middleware = require('../modules/middlewares');

/* GET users listing. */
router.post('/write', middleware.userJwt, middleware.partyID, journalController.write);
router.get('/getMyJournal', middleware.userJwt, middleware.partyID, middleware.dateTime, journalController.getMyJournal);

module.exports = router;

