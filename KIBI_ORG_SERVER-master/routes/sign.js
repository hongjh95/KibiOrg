var express = require('express');
var router = express.Router();
const signController = require('../controllers/signController');
const middleware = require('../modules/middlewares');

router.get('/signList', middleware.userJwt, middleware.partyID, signController.signList);
router.post('/signListD', middleware.userJwt, middleware.partyID, signController.signListD);
router.post('/getXList', middleware.userJwt, middleware.partyID, signController.getXList);
router.post('/makeSign', middleware.userJwt, middleware.partyID, signController.makeSign);
router.delete('/deleteList', middleware.userJwt, middleware.partyID, signController.deleteList);
router.post('/putList', middleware.userJwt, middleware.partyID, signController.putList);
module.exports = router;