var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/company', require('./company'));
router.use('/user', require('./user'));
router.use('/sign', require('./sign'));
router.use('/journal', require('./journal'));
router.use('/approve', require('./approve'));
router.use('/message', require('./message'));
router.use('/schedule',require('./schedule'));
router.use('/message', require('./message'));
router.use('/employee',require('./employee'));
router.use('/schedule',require('./schedule'));
router.use('/message', require('./message'));
router.use('/admin', require('./admin'));
router.use('/invite', require('./invite'));
router.use('/notice', require('./notice'));
router.use('/org', require('./org'));
router.use('/file', require('./file'));

module.exports = router;
