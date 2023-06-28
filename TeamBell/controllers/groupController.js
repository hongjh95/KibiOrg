const groupModel = require('../models/group');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const Hangul = require('hangul-js');
const moment = require('moment');
module.exports = {
  /*
  * 그룹 생성 (방장은 생성과 동시에 그룹 디비에 join)
  */
    make: async (req, res) => {
        const userIdx = req.userIdx;
        if (!userIdx) {
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
          return;
        }
        const createdAt = moment().format('YYYY-MM');
        const { name, password, info } = req.body;       
        if (!name || !password || !info) {
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
          return;
        }
        const searchKeyword = name.replace(/(\s*)/g,"");
        const consonantVowel = Hangul.disassemble(searchKeyword);
        const nameConsonatVowel = consonantVowel.join("");
        const make = await groupModel.make(userIdx, name, nameConsonatVowel, password, info, createdAt);
        
        if (make === -1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
        const groupIdx = await groupModel.groupIdx(name, userIdx);
        const join = await groupModel.join(groupIdx, name, userIdx);
        if (join === -1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.MAKE_GROUP_SUCCESS));
      },

  /*
  * 그룹참여
  */
    join: async (req, res) => {
        const userIdx = req.userIdx;
        const groupIdx= req.params.groupIdx;

        if (!userIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
            return;
          }

        const {password} = req.body;
        const name = await groupModel.groupIdx2(groupIdx);
        if (!password) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }      
        const check = await groupModel.password(password, groupIdx);
        if (check === -1){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW2));
          return;
        }
        else {
        const join = await groupModel.join(groupIdx, name, userIdx);
        if (join === -1){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.FAILED_JOIN_GROUP));
          return;
        }
    }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_JOIN_GROUP));
    },

  /*
  * 그룹별 멤버 정보
  */
    member: async(req, res) => {
        const userIdx = req.userIdx;
        const groupIdx = req.params.groupIdx;
        if (!userIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
            return;
          }
          
        if (!groupIdx){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const info = await groupModel.info(groupIdx);
        const member = await groupModel.member(groupIdx);
        if (member === -1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
      let flag=false;
       if(member.length != 0){
        for(i=0; i<member.length; i++){
          if (member[i].userIdx==userIdx)
          flag=true;
        }
      }
      
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_GROUP_INFO, {flag, info}));
    },

  /*
  * 생성된 그룹리스트
  */
    groupList: async(req, res) => {
      const groupList = await groupModel.groupList();
      if (groupList === -1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_GROUPLIST, groupList));
  },
  /*
  * 그룹검색
  */
    search : async (req, res) => {
      const { name, pageStart, pageEnd } = req.query;
      
      if (!name || pageStart === undefined || pageEnd === undefined) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
      }

      const userIdx = req.userIdx;
      if (!userIdx) {
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        return;
      }
  
      // 모든 공백을 제거하는 정규식
      const searchKeyword = name.replace(/(\s*)/g,"");
      const consonantVowel = Hangul.disassemble(searchKeyword);

      // 자모음 분리 결과가 배열이라 문자열로 합치기
      const titleConsonatVowel = consonantVowel.join("");

      //검색
      try {
        const nameResult = await groupModel.search(titleConsonatVowel, userIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, nameResult));
        return;
      } catch (err) {
        console.log(err);
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.SERVER_ERROR));
        return;
      }
    },

    /*
  * 그룹탈퇴
  */
  delete : async (req, res) => {
  const userIdx = req.userIdx;
  const groupIdx = req.params.groupIdx;
  if (!userIdx || !groupIdx) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  const idx = await groupModel.delete(userIdx, groupIdx);

  res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.DELETE_SUCCESS));
},

}