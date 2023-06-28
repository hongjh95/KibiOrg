var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const middleware = require('../modules/middlewares');

/* GET users listing. */
router.post('/status', middleware.userJwt, middleware.partyID, adminController.status);
router.post('/statusSearch', middleware.userJwt, middleware.partyID, adminController.statusSearch);
router.post('/task', middleware.userJwt, middleware.partyID, adminController.task);
router.post('/taskSearch', middleware.userJwt, middleware.partyID, adminController.taskSearch);
router.get('/taskComment', middleware.userJwt, middleware.partyID, adminController.taskComment);
router.get('/projectList', middleware.userJwt, middleware.partyID, adminController.projectList);
router.put('/projectEdit', middleware.userJwt, middleware.partyID, adminController.projectEdit);
router.delete('/projectDelete', middleware.userJwt, middleware.partyID, adminController.projectDelete);
router.get('/annual', middleware.userJwt, middleware.partyID, adminController.annualList);
router.put('/annualEdit', middleware.userJwt, middleware.partyID, adminController.annualEdit);



module.exports = router;
