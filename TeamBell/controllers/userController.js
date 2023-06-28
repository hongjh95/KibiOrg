const userModel = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');
const moment = require('moment');

module.exports = {
  /*
  * 회원가입
  */
  signup : async ( req, res ) => {
    const {
      email,
      password,
      name
    } = req.body;

    if (!email || !name) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
    // 사용자 중인 아이디가 있는지 확인
    if (await userModel.checkUser(email)) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
    }

    const {
      salt,
      hashed
    } = await encrypt.encrypt(password);
    const createdAt = moment().format('YYYY-MM');
    const idx = await userModel.signup( email, hashed, salt, name, createdAt);
    if ( idx === -1 ) {
      return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    const user = await userModel.findByUserEmail(email);

    if (user[0] === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    const {
      token,
      refreshToken
    } = await jwt.sign(user[0]);

    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
        accessToken: token,
        refreshToken: refreshToken
      }));     
  },

  /*
  * 로그인
  */

  signin : async (req, res) => {
    const {
        email,
      password
    } = req.body;

    if (!email || !password) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
    const user = await userModel.findByUserEmail(email);

    if (user[0] === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }
    // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
    const hashed = await encrypt.encryptWithSalt(password, user[0].salt);

    if (hashed !== user[0].password) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    }

    // 로그인할 때 refreshToken, accessToken 새로 발급
    const {
      token,
      refreshToken
    } = await jwt.sign(user[0]);
    const info = await userModel.getInfo(email);
    // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
        accessToken: token,
        refreshToken: refreshToken,
        name: info[0].name,
        email: info[0].email
    }));
  },

  /*
  * 회원탈퇴
  */

  withdrawal : async (req, res) => {
        const userIdx = req.userIdx;

    if (!userIdx) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
    // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
    const user = await userModel.getUserByIdx(userIdx);

    if (user[0] === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

     const idx = await userModel.withdrawal(userIdx);

    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.WITHDRAWAL_SUCCESS));
  },

  /*
  * 프로필 정보 보여주기
  */

  profile : async(req, res) => {
    const userIdx = req.userIdx;
    if (!userIdx) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN))
      return;
    }
    const idx = await userModel.profile(userIdx);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_PROFILE_READ, 
      idx[0]
    ))
  },

  
  /*
  * 이메일 중복체크
  */
  checkUserEmail : async(req, res) => {
    const {email} = req.body;

    if (!email) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE))
      return;
    }

    // 사용자 중인 아이디가 있는지 확인
    if (await userModel.checkUser(email)) {
      res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.AVAILABLE_ID))
  },

/*
* 내가 속한 그룹
*/

  myGroup: async (req, res) => {
    const userIdx = req.userIdx;

    if (!userIdx) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
      return;
    }

    const myGroupList = await userModel.myGroup(userIdx);

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_MY_GROUP_LIST, myGroupList));
  },

  /*
  * 비번바꾸기
 */

 password : async (req, res) => {
   const userIdx = req.userIdx;
  const {
    password
  } = req.body;

  if (!password) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
  const user = await userModel.getUserByIdx(userIdx);
  if (user[0] === undefined) {
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
  }
  const {
    salt,
    hashed
  } = await encrypt.encrypt(password);

  const idx = await userModel.password( userIdx, hashed, salt);
  if ( idx === -1 ) {
    return res.status(statusCode.DB_ERROR)
      .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }

   res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.PASSWD_SUCCESS, idx));
},
}
