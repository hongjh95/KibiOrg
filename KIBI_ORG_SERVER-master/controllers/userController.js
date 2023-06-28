const userModel = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');


module.exports = {
  /*
  * 회원가입
  */
  signup : async ( req, res ) => {
    const { partyID, userID, userPW, userName, userNameEn, userPhone, userEmail, permit, admin } = req.body;
    console.log(req.body);
    if ( !partyID || !userID || !userPW || !userName || !userNameEn || !userPhone || !userEmail || !permit || !admin) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
    // 사용자 중인 아이디가 있는지 확인
    if (await userModel.checkUser(userID)) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
    }

    // const {
    //   salt,
    //   hashed
    // } = await encrypt.encrypt(userPW);
    const hashed = await encrypt.encrypt(userPW);
    
    const idx = await userModel.signupA( partyID, userID, hashed, userName, userNameEn, userPhone, userEmail, permit, admin);
    if ( idx === -1 ) {
      return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    const user = await userModel.findByUserID(userID);
    console.log(user)
    if (user.rowsAffected[0] === 0) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    const {
      token,
      refreshToken
    } = await jwt.sign(user.recordset[0]);

    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
        accessToken: token,
        refreshToken: refreshToken
      }));     
  },

  signin : async (req, res) => {
    const {
      userID,
      password
    } = req.body;

    if (!userID || !password) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
    const user = await userModel.findByUserID(userID);
    console.log(user);

    if (user.rowsAffected[0] === 0) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    } else if (user.recordset[0].PERMIT_YN === 'N'){
      return res.status(statusCode.UNAUTHORIZED)
      .send(util.fail(statusCode.UNAUTHORIZED, resMessage.NO_UNAUTH));
    } else if (user.recordset[0].OUT_COM_YN === 'Y'){
      return res.status(statusCode.NOT_ALLOW)
      .send(util.fail(statusCode.NOT_ALLOW, resMessage.YOUR_EXITED));
    }
    // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
    const hashed = await encrypt.encrypt(password);

    if (hashed !== user.recordset[0].PASSWORD_IF) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    }

    // 로그인할 때 refreshToken, accessToken 새로 발급
    const {
      token,
      refreshToken
    } = await jwt.sign(user.recordset[0]);
    const info = await userModel.getInfo(userID);
    // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
        accessToken: token,
        refreshToken: refreshToken,
        ID: info.recordset[0].USER_ID,
        PARTYNM: info.recordset[0].PARTY_NM,
        PARTYID: info.recordset[0].PARTY_ID,
        NAME: info.recordset[0].USER_NM,
        EMAIL: info.recordset[0].EMAIL_IF,
        ISADMIN: info.recordset[0].IS_ADMIN,
        LEVEL: info.recordset[0].MY_PARTY_LEV
    }));
  },

  fcmToken : async ( req, res ) => {
    const userID = req.userID;
    const partyID = req.partyid;
    const fcmToken = req.body.fcmtoken;

    if ( !partyID || !userID || !fcmToken ) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    const fcm_Token = await userModel.fcmToken(userID, partyID, fcmToken);
    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.SUCCESS_POST_FCM_TOKEN, {
        message: fcm_Token
    }));
  },

  attendStart : async ( req, res ) => {
    const userID = req.userID;
    const { partyID, ip, location } = req.body;
    console.log(req.body);
    if ( !partyID || !userID ) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    const attendStart = await userModel.attendStart(userID, partyID, ip, location);
    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.ATTEND_START_SUCCESS, {
        message: attendStart.recordset[0]
    }));
  },

  attendEnd : async ( req, res ) => {
    const userID = req.userID;
    const { partyID, ip, location } = req.body;
    console.log(req.body);
    if ( !partyID || !userID ) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    const attendEnd = await userModel.attendEnd(userID, partyID, ip, location);
    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.ATTEND_END_SUCCESS, {
        message: attendEnd.recordset[0]
    }));
  },

  myInfo : async ( req, res ) => {
    const userID = req.userID;
    const partyID = req.partyid;
    if (!userID || !partyID){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.INVALID_TOKEN));
      return;
    }

    const result = await userModel.myInfo(userID, partyID);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_INFO, {
      message : result.recordset[0]
    }));

  },

  depInfo : async ( req, res ) => {
    const partyID = req.partyid;
    if(!partyID){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.CANNOT_FIND_PARTID));
      return;
    }

    const result = await userModel.depInfo(partyID);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_DEP, {
      message : result.recordset
    }));
  },



  editInfo : async ( req, res ) => {
    const userID = req.userID;
    const partyID = req.partyid;
    const {
     userName, userEName, userDep, userPos, userPhone, userEmail, userWork
    } = req.body;

    console.log("유저아이디 , 파티아이디 : ", userID + " " + partyID);
    if(!userID || !partyID){
      console.log("오류")
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.INVALID_TOKEN));
      return;
    }

    const result = await userModel.editInfo(userID, partyID, userName, userEName, userDep, userPos, userPhone, userEmail, userWork);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_EDIT_INFO, {
      message : result.recordset[0]
    }));
  },

  attendStatus : async ( req, res ) => {
    const userID = req.userID;
    const partyID = req.partyid;

    if(!userID || !partyID){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.INVALID_TOKEN));
      return;
    }

    const result = await userModel.attendStatus(userID, partyID);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_STATUS, result.recordset[0]));
  },

  myAttend : async ( req, res ) => {
    const userID = req.userID;
    const partyID = req.partyid;
    const date = req.date;

    if(!userID || !partyID){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.INVALID_TOKEN));
      return;
    }

    const result = await userModel.myAttend(userID, partyID, date);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ATTEND, result.recordset));
  },

  signUpSocialCheck : async  (req , res) => {
    const userID = req.body.userID;
      if (await userModel.checkUser(userID)) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        console.log('이미 아이디가 있을때');
        return;
      }else{
        console.log("회원가입 진행 : "+userID);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.AVAILABLE_ID,userID));
        return;
      };
  },

  signUpSocial : async ( req, res ) => {
    const { partyID, userID, userPW, userName, userNameEn, userPhone, userEmail, permit, admin } = req.body;
    console.log(req.body);
    if ( !partyID || !userID || !userPW || !userName || !userNameEn || !userPhone || !userEmail || !permit || !admin) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    const hashed = await encrypt.encrypt(userPW);
    
    const idx = await userModel.signupA( partyID, userID, hashed, userName, userNameEn, userPhone, userEmail, permit, admin);
                                         
    if ( idx === -1 ) {
      return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    
    const user = await userModel.findByUserID(userID);
    console.log(user)
    if (user.rowsAffected[0] === 0) {
      return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }
    
    const {
      token,
      refreshToken
    } = await jwt.sign(user.recordset[0]);

    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
        accessToken: token,
        refreshToken: refreshToken
      }));     
  },

  checkToken : async (req, res) => {
      const userID = req.userID;
      if (userID) {
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, req.userID))
      }
  }

  
}