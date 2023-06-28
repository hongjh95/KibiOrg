var express = require('express');
var router = express.Router();
const fileController = require('../controllers/fileController');
const middleware = require('../modules/middlewares');

/* GET users listing. */
router.get('/fileList', middleware.userJwt, middleware.partyID, fileController.fileList);

module.exports = router;
