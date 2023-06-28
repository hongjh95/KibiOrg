const express = require('express');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const router = express.Router();
const middleware = require('../modules/middlewares');

router.post('/signup', userController.signup); //회원가입
router.post('/signin', userController.signin); //로그인
router.post('/checkEmail', userController.checkUserEmail); //이메일 중복체크
router.get('/profile', middleware.userJwt, userController.profile); //내 프로필 조회
router.delete('/withdrawal', middleware.userJwt, userController.withdrawal); //회원탈퇴
router.get('/myGroup', middleware.userJwt, userController.myGroup) // 나의 그룹
router.put('/passwd', middleware.userJwt, userController.password) // 나의 그룹
router.get('/', adminController.userList);
module.exports = router;
