var express = require('express');
var router = express.Router();
const approveController = require('../controllers/approveController');
const middleware = require('../modules/middlewares');

/* GET users listing. */
router.get('/for', middleware.userJwt, middleware.partyID, approveController.for);
router.get('/for/:seq', middleware.userJwt, middleware.partyID, approveController.forDetail);
router.get('/for/getStatus/:seq', middleware.userJwt, middleware.partyID, approveController.getStatus);
router.put('/for/doApprove', middleware.userJwt, middleware.partyID, approveController.doApprove);
router.get('/done', middleware.userJwt, middleware.partyID, approveController.done);
router.get('/written', middleware.userJwt, middleware.partyID, approveController.written);
router.put('/for/noApprove', middleware.userJwt, middleware.partyID, approveController.noApprove);
router.post('/submit', middleware.userJwt, middleware.partyID, approveController.submit);
router.post('/cancel', middleware.userJwt, middleware.partyID, approveController.cancel);
router.delete('/delete', middleware.userJwt, middleware.partyID, approveController.delete);

module.exports = router;
