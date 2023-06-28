var express = require('express');
var router = express.Router();
const middleware = require('../modules/middlewares');
const employeeController = require("../controllers/employeeController");

router.get('/getEmployeeList', middleware.userJwt, middleware.partyID, employeeController.getEmployeeList);
router.get('/getEmployeeUser', middleware.userJwt, middleware.partyID, employeeController.getEmployeeUser);
router.post('/getEmployeeSearch', middleware.userJwt, middleware.partyID, employeeController.getEmployeeSearch);
router.post('/postEmployeeUser', middleware.userJwt, middleware.partyID, employeeController.postEmployeeUser);
router.put('/putEmployeeUserEdit', middleware.userJwt, middleware.partyID, employeeController.putEmployeeUserEdit);
router.put('/putEmployeeUserResetPassword', middleware.userJwt, middleware.partyID, employeeController.putEmployeeUserResetPassword);
router.post('/putEmployeeUserPermitY',middleware.userJwt, middleware.partyID, employeeController.putEmployeeUserPermitY);
router.delete('/deleteEmployeeUserPermit',middleware.userJwt, middleware.partyID, employeeController.deleteEmployeeUserPermit);

module.exports = router;