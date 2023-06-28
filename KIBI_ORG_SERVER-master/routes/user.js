var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../modules/middlewares');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');

/* GET users listing. */
router.post('/signupA', userController.signup);
router.post('/signin', userController.signin);
router.put('/fcmtoken', middleware.userJwt, middleware.partyID, userController.fcmToken);
router.post('/signUpSocialCheck',userController.signUpSocialCheck);
router.post('/signUpSocial',userController.signUpSocial);
router.post('/attendStart',  middleware.userJwt, userController.attendStart);
router.post('/attendEnd',  middleware.userJwt, userController.attendEnd);
router.get('/myinfo', middleware.userJwt, middleware.partyID, userController.myInfo);
router.get('/depinfo', middleware.userJwt, middleware.partyID, userController.depInfo);
router.put('/editInfo', middleware.userJwt, middleware.partyID, userController.editInfo);
router.get('/attendStatus', middleware.userJwt, middleware.partyID, userController.attendStatus);
router.get('/myAttend', middleware.userJwt, middleware.partyID, middleware.dateTime, userController.myAttend);
router.post('/checkToken', middleware.userJwt, userController.checkToken);

module.exports = router;
