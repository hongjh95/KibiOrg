const express = require('express');
const recordController = require('../controllers/recordController');
const router = express.Router();
const middleware = require('../modules/middlewares');

router.get('/today', middleware.userJwt, recordController.record); //일별 기록
router.get('/gpx/:idx', recordController.gpx); //gpx 가져오기
router.get('/day', middleware.userJwt, recordController.day); //일별 통계
router.get('/week', middleware.userJwt, recordController.week); //주별 통계
router.get('/month', middleware.userJwt, recordController.month) //월별 통계
router.get('/year', middleware.userJwt, recordController.year) //년별 통계
module.exports = router;
