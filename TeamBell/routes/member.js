const express = require('express');
const memberController = require('../controllers/memberController');
const router = express.Router();
const middleware = require('../modules/middlewares');

router.put('/update/:groupIdx', middleware.userJwt, memberController.update);
router.post('/personal', middleware.userJwt, memberController.personal);
router.put('/status/:groupIdx', middleware.userJwt, memberController.available);
router.put('/input/:groupIdx', middleware.userJwt, memberController.input);
router.get('/output/:groupIdx', middleware.userJwt, memberController.output);
module.exports = router;