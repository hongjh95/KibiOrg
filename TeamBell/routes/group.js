const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();
const middleware = require('../modules/middlewares');

router.post('/make', middleware.userJwt, groupController.make);
router.post('/join/:groupIdx', middleware.userJwt, groupController.join);
router.get('/member/:groupIdx', middleware.userJwt, groupController.member);
router.get('/groupList', groupController.groupList);
router.get('/search', middleware.userJwt, groupController.search);
router.delete('/delete/:groupIdx', middleware.userJwt, groupController.delete);
module.exports = router;