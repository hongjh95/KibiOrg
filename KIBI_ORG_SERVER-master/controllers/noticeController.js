const noticeModel = require('../models/notice');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

module.exports = {
    notice : async (req, res) => {
        const partyID = req.partyid;

        const result = await noticeModel.notice(partyID);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_NOTICE, result.recordset));
    },

    logout : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;

        const result = await noticeModel.logout(userID, partyID);
        if(result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_LOGOUT_TO_ERASE_FCMTOKEN, result));
    }

}