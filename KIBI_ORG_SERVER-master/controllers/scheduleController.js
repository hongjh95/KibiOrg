const scheduleModel = require('../models/schedule');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

module.exports = {

    scheduleList : async (req, res) => {
        const partyId = req.partyid;
        const userID = req.userID;
        const calyearDt = req.headers.calyeardt;
        const result = await scheduleModel.scheduleList(partyId, calyearDt, userID);

        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_SCHEDULE_LIST, result.recordset));
    },


    scheduleUser : async (req, res) => {
      const pjtId = req.headers.pjt_id;
      const partyId = req.headers.partyid;
      const yyyy = req.headers.year;
      const result = await scheduleModel.scheduleUser(partyId, pjtId, yyyy);

      if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_SCHEDULE_LIST, result.recordset));
    },


    scheduleUserCount : async (req, res) => {
        const pjtId = req.body.pjtId;
        const partyId = req.body.partyID;
        const result = await scheduleModel.scheduleUserCount(pjtId, partyID);

        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_SCHEDULE_LIST, result.recordset));
    }

    
}