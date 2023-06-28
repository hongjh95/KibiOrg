const express = require('express');
const socialController = require('../controllers/socialController');
const router = express.Router();

router.post('/google', socialController.google); //구글로그인
router.post('/kakao', socialController.kakao); //카카오로그인

module.exports = router;
