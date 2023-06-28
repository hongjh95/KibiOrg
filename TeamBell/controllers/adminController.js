const adminModel = require('../models/admin');
const encrypt = require('../modules/crypto');
const moment = require('moment');
module.exports = {
    userCount: async (req, res) => {
        const userCount = await adminModel.userCount();
        const groupCount = await adminModel.groupCount();
        const RidingCount = await adminModel.RidingCount();
        const MonthCount = await adminModel.MonthCount();
        res.render("main", {userCount : userCount, groupCount: groupCount, RidingCount:RidingCount, MonthCount:MonthCount, user:req.session.user});
    },
    userList: async (req, res) => {
        const userList = await adminModel.userList();
        res.render("user",{userList:userList, user:req.session.user});
    },

    postList: async (req, res) => {
        const postList = await adminModel.postList();
        res.render("admin",{postList:postList, user:req.session.user});
    },

    writePost: async (req, res) => {
        const {title, info} = req.body;
        const name = req.session.user.name
        const createdAt = moment().format('YYYY-MM-DD HH:mm');
        const postList = await adminModel.write(name, title, info, createdAt);
        res.redirect('./admin')
    },

    updatePost: async (req, res) => {
        const {title, info} = req.body;
        const idx=req.params.idx;
        const name = req.session.user.name
        const createdAt = moment().format('YYYY-MM-DD HH:mm');
        const postList = await adminModel.updatePost(idx, name, title, info, createdAt);
        res.redirect('../admin')
    },

    deletePost: async (req, res) => {
        const idx=req.params.idx;
        const name = req.session.user.name
        const postList = await adminModel.deletePost(idx, name);
        res.redirect('../admin')
    },

    postDetail: async (req, res) => {
        const idx=req.params.idx;
        const writer = await adminModel.getWriter(idx);
        const postList = await adminModel.getPost(idx);
        res.render("post",{postList:postList,user:req.session.user, writer:writer});
    },

    userStat: async (req, res) => {
        const userList = await adminModel.userList();
        res.render("userStat",{userList:userList,user:req.session.user});
    },

    day: async (req, res) => {
        const userList = await adminModel.day();
        res.render("day",{userList:userList,user:req.session.user});
    },

    week: async (req, res) => {
        const userList = await adminModel.week();
        res.render("week",{userList:userList,user:req.session.user});
    },

    month: async (req, res) => {
        const userList = await adminModel.month();
        res.render("month",{userList:userList,user:req.session.user});
    },

    year: async (req, res) => {
        const userList = await adminModel.year();
        res.render("year",{userList:userList,user:req.session.user});
    },

    RidingList: async (req, res) => {
        const ridingList = await adminModel.RidingList();
        res.render("ridingStat",{ridingList:ridingList,user:req.session.user});
    },

    ridingDay: async (req, res) => {
        const ridingList = await adminModel.RidingDay();
        res.render("ridingDay",{ridingList:ridingList,user:req.session.user});
    },

    ridingWeek: async (req, res) => {
        const ridingList = await adminModel.RidingWeek();
        res.render("ridingWeek",{ridingList:ridingList,user:req.session.user});
    },

    ridingMonth: async (req, res) => {
        const ridingList = await adminModel.RidingMonth();
        res.render("ridingMonth",{ridingList:ridingList,user:req.session.user});
    },

    ridingYear: async (req, res) => {
        const ridingList = await adminModel.RidingYear();
        res.render("ridingYear",{ridingList:ridingList,user:req.session.user});
    },

    login : async (req, res) => {
        const {
            id,
          password
        } = req.body;
        
        if (!id || !password) {
            res.send('<script type="text/javascript">alert("아이디 또는 비밀번호를 입력해주세요.");history.back();</script>');
            return;
        }
    
        // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
        const user = await adminModel.findById(id);
        if (user[0] === undefined) {
            res.send('<script type="text/javascript">alert("아이디 또는 비밀번호가 틀렸습니다.");history.back();</script>');
            return;
        }
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
    
        if (hashed !== user[0].password) {
            res.send('<script type="text/javascript">alert("아이디 또는 비밀번호가 틀렸습니다.");history.back();</script>');
            return;
        }
        req.session.user = {
            "id" : id,
            "name" : user[0].name
        }
        console.log(req.session.user)
        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
        return req.session.save(()=>{
            res.redirect('/main');
            })
      },

      signup : async ( req, res ) => {
        const {
          id,
          password,
          name
        } = req.body;
    
        if (!id || !password || !name) {
            res.send('<script type="text/javascript">alert("정보를 모두 입력해주세요.");history.back();</script>');
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await adminModel.checkUser(id)) {
            res.send('<script type="text/javascript">alert("이미 아이디가 존재합니다.");history.back();</script>');
            return;
        }
    
        const {
          salt,
          hashed
        } = await encrypt.encrypt(password);
        console.log(id, hashed, salt, name);
        const idx = await adminModel.signup(id, hashed, salt, name);
        console.log(idx)
        if ( idx === -1 ) {
            res.send('<script type="text/javascript">alert("회원가입에 실패했습니다.");history.back();</script>');
            return;
        }
    
        const user = await adminModel.findById(id);
    
        if (user[0] === undefined) {
            res.send('<script type="text/javascript">alert("회원가입에 실패했습니다.");history.back();</script>');
            return;
        }
    
        res.redirect("/");
      },

      getMonthUser: async (req, res) => {
        const list = await adminModel.getMonthUser();
        res.json({list:list});
    },

    getMonthRiding: async (req, res) => {
        const list = await adminModel.getMonthRiding();
        res.json({list:list});
    },

    sumMonthUser: async (req, res) => {
        const list = await adminModel.sumMonthUser();
        res.json({list:list});
    },

    sumMonthGroup: async (req, res) => {
        const list = await adminModel.sumMonthGroup();
        res.json({list:list});
    },
    
}