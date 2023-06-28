const memberModel = require('../models/member');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const moment = require('moment');

module.exports = {

  /*
  * (그룹라이딩용)기록 저장 available이 2일때만 user 업데이트 가능
  */
    update: async(req, res) => {
    const groupIdx= req.params.groupIdx;
    const userIdx = req.userIdx;
    const date = moment().format('YYYY-MM-DD HH:mm');
    const {distance, time, avgSpeed, dep, arr, gpx} = req.body;
    if (!distance || !time || !avgSpeed || !dep || !arr || !gpx) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
      const record = await memberModel.records(userIdx, distance, time, avgSpeed, date, dep, arr, gpx);
      const userRecord = await memberModel.updateUser(userIdx,groupIdx, distance, time, avgSpeed);
      if (record ===-1 || userRecord === -1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_RECORD, userRecord));
  },

    /*
  * (개인라이딩용)기록 저장
  */
 personal: async(req, res) => {
  const userIdx = req.userIdx;
  const date = moment().format('YYYY-MM-DD HH:mm');
  const {distance, time, avgSpeed, dep, arr, gpx} = req.body;

  if (!time || !dep || !arr || !gpx) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }
    const record = await memberModel.records(userIdx, distance, time, avgSpeed, date, dep, arr, gpx);
    if (record ===-1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_RECORD, record));
},
  /*
  * 라이딩 활성화 변경부분
  */
  available: async(req, res) => {
    const groupIdx= req.params.groupIdx;
    const userIdx = req.userIdx;
    const {available} = req.body;
    if (!available) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
    const status = await memberModel.available(userIdx, groupIdx, available);
      if (status === -1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_AVAILABLE));
  },

  input: async(req, res) => {
    const groupIdx= req.params.groupIdx;
    const userIdx = req.userIdx;
    const {lat, lon} = req.body;
    if (!lat || !lon) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
    const status = await memberModel.input(userIdx, groupIdx, lat, lon);
      if (status === -1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_INPUT));
  },

  output: async(req, res) => {
    const groupIdx= req.params.groupIdx;
    const userIdx=req.userIdx;
    const status = await memberModel.output(userIdx, groupIdx);
      if (status === -1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_OUTPUT, status));
  },
  
}
