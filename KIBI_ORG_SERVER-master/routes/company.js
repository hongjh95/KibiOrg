var express = require('express');
var router = express.Router();
const companyController = require('../controllers/companyController');
const middleware = require('../modules/middlewares');

/* GET users listing. */
router.get('/searchCom/:comName', companyController.search);
router.post('/create', companyController.create);

module.exports = router;
