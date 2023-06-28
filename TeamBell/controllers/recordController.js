const recordModel = require('../models/record');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const moment = require('moment');

module.exports = {

  /*
  * 일별 기록
  */
    record: async(req, res) => {
    const userIdx = req.userIdx;
    const date = moment().format('YYYY.MM.DD HH:mm');

      const record = await recordModel.record(userIdx, date);
      
      if (record ===-1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_RECORD, record));
  },

    /*
  * gpx 가져오기
  */
 gpx: async(req, res) => {
  const idx = req.params.idx;
    const record = await recordModel.gpx(idx);
    
    if (record ===-1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_RECORD, record));
},

    /*
  * 일별 통계
  */
  day: async(req, res) => {
  const userIdx = req.userIdx;
  const date = moment().format('YYYY.MM.DD');

    const record = await recordModel.day(userIdx, date);
    
    if (record ===-1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_RECORD, record));
},


  /*
  * 주별 통계
  */
 week: async(req, res) => {
    const userIdx = req.userIdx;
    const date = moment().format('YYYY.MM.DD');

      const record = await recordModel.week(userIdx);
      
      if (record ===-1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_RECORD, record));
  },

  /*
  * 월별 통계
  */
 month: async(req, res) => {
    const userIdx = req.userIdx;
    const date = moment().format('YYYY.MM.DD');

      const record = await recordModel.month(userIdx);
      
      if (record ===-1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_RECORD, record));
  },

  /*
  * 년별 통계
  */
    year: async(req, res) => {
    const userIdx = req.userIdx;
    const date = moment().format('YYYY.MM.DD');

      const record = await recordModel.year(userIdx);
      
      if (record ===-1){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_RECORD, record));
  },
  
}
