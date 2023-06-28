const orgModel = require('../models/org');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

module.exports = {
    list : async (req, res) => {
        const partyID = req.partyid;
        const userID = req.headers.name;

        const result = await orgModel.list(partyID, userID);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ORG_LIST, result.recordset));
    },

    attend : async ( req, res ) => {
        const userID = req.headers.otherid;
        const partyID = req.partyid;
        const date = req.date;
    
        if(!userID || !partyID){
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.INVALID_TOKEN));
          return;
        }
    
        const result = await orgModel.attend(userID, partyID, date);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ATTEND, result.recordset));
      },

      journal : async (req, res) => {
        const partyID = req.partyid;
        const userID = req.headers.otherid;
        const date = req.date;
        const isOwner = "N";

        const result = await orgModel.journal(partyID, userID, date, isOwner);

        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_MYJOURNAL, result.recordset));

    },

    comment : async (req, res) => {
      const userID = req.userID;
      const {seq, comment} = req.body;

      const result = await orgModel.comment(seq, userID, comment);

      if(result.length < 1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_WRITE_COMMENT, result));
    },

    commentRead : async (req, res) => {
      const userID = req.userID;
      const partyID = req.partyid;
      const seq = req.headers.seq;

      const result = await orgModel.commentRead(partyID, userID, seq);

      if(result.length < 1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_WRITE_COMMENT, result.recordset));
    },


}