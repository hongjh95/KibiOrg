const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const admin = require('../models/admin');

/* GET home page. */
router.use('/user', require('./user'));
router.use('/group', require('./group'));
router.use('/member', require('./member'));
router.use('/record', require('./record'));
router.use('/social', require('./social'));
router.get("/getMonthUser", adminController.getMonthUser);
router.get("/getMonthRiding", adminController.getMonthRiding);
router.get("/sumMonthGroup", adminController.sumMonthGroup);
router.get("/sumMonthUser", adminController.sumMonthUser);
router.get("/main", adminController.userCount);
router.get("/userStat", adminController.userStat);
router.get("/day", adminController.day);
router.get("/week", adminController.week);
router.get("/month", adminController.month);
router.get("/year", adminController.year);
router.get("/ridingStat", adminController.RidingList);
router.get("/ridingDay", adminController.ridingDay);
router.get("/ridingWeek", adminController.ridingWeek);
router.get("/ridingMonth", adminController.ridingMonth);
router.get("/ridingYear", adminController.ridingYear);
router.post("/", adminController.login);
router.post("/register", adminController.signup);
router.get("/admin", adminController.postList);
router.post("/write", adminController.writePost);
router.post("/update/:idx", adminController.updatePost);
router.post("/delete/:idx", adminController.deletePost);
router.get("/post/:idx", adminController.postDetail);
router.get("/write", (req, res, next) =>{
    res.render("write",{user:req.session.user});
});
router.get("/update/:idx", (req, res, next) =>{
    const idx = req.params.idx;
    res.render("update",{user:req.session.user, idx:idx});
});
router.get("/delete/:idx", (req, res, next) =>{
    const idx = req.params.idx;
    res.render("delete",{user:req.session.user, idx:idx});
});
router.get("/register", (req, res, next) =>{
    res.render('register');
});
router.get("/", (req, res, next) =>{
    res.render('index');
});
router.route('/logout')
.get((req,res)=>{
    req.session.destroy(function(){
        req.session;
        });
        res.redirect('/main');
})

module.exports = router;
