const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const secret = require('../config/secretKey');
const socialModel = require('../models/social');
const userModel = require('../models/user');
const jwt_module = require('../modules/jwt');
const encrypt = require('../modules/crypto');
module.exports = {
  /*
  * 소셜로그인
  */
  google : async ( req, res ) => {
    const {idToken} = req.body;

    let uid = jwt_decode(idToken);

    const sub = uid.sub;
    const email = uid.email;
    const name = uid.name;
    const token = jwt.sign({
        id: sub,
        name,
        email
    },
    secret.secretKey
    );

    uid=email;
    var results = await socialModel.signin(uid);
          if (results.length > 0) {
             var result =await socialModel.updateToken(email, token)
var user = await userModel.findByUserEmail(email);
  
 } else {
            //새로 유저를 만들면 jwt 토큰값을 받아온다.
const password="kibi0625";
const {
      salt,
      hashed
    } = await encrypt.encrypt(password);
           var result =await socialModel.insertUserIntoDB(email,hashed,salt, name, sub, token);
var user = await userModel.findByUserEmail(email);

        }

const info = await userModel.getInfo(email);
const t = await jwt_module.sign(user[0]);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, { accessToken: t.token, refreshToken: t.refreshToken,        name: info[0].name,
          email: info[0].email }));
    },

 kakao: async (req, res)=>{
    const {id, email, name, refreshToken} = req.body;
    var results = await userModel.findByUserEmail(email);
    if(results.length>0){
        //이미 가입된 사용자라면
        var result =await socialModel.updateToken(email, refreshToken);
        var user = await userModel.findByUserEmail(email);
 } else{

    const password="kibi0625";
const {
      salt,
      hashed
    } = await encrypt.encrypt(password);
           var result =await socialModel.insertUserIntoDB(email,hashed,salt, name, id, refreshToken);
           var user = await userModel.findByUserEmail(email);
 }
 const info = await userModel.getInfo(email);
 const t = await jwt_module.sign(user[0]);
 res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, { accessToken: t.token, refreshToken: t.refreshToken,         name: info[0].name,
  email: info[0].email }));
}}
