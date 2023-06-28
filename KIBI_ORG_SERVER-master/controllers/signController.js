const signModel = require('../models/sign');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const { json } = require('express');


module.exports = {
    signList : async (req, res) => {
        const partyID = req.partyid;
        const userID = req.userID;
        const result = await signModel.signList(partyID, userID);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_SIGNLIST, result.recordset));
    },

    getXList : async (req, res) => {
        const partyID = req.partyid;
        const userID = req.userID;
        const {seq} = req.body;
        const seq2 = parseInt(seq);
        const result = await signModel.getXList(partyID, userID, seq);
        if (result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_XLIST, result.recordset));
    },

    makeSign : async (req, res) => {
        const partyID = req.partyid;
        const userID = req.userID;
        const {signName} = req.body;

        const result = await signModel.makeSign(partyID, userID, signName);
        if (result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_MAKE_SIGN, result));
    },

    deleteList : async (req, res) => {
      const partyID = req.partyid;
      const { seq, flag } = req.body;

      const result = await signModel.deleteList(partyID, seq, flag);
      if(result.length < 1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_SIGN, result));
    },

    putList : async (req, res) => {
      const partyID = req.partyid;
      const {seq, userID, sort} = req.body;

      const result = await signModel.putList(partyID, seq, userID, sort);
      if(result.length < 1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.PUT_SIGN_LIST, result));
    },

    signListD : async (req, res) => {
      const partyID = req.partyid;
      const {seq} = req.body;

      const result = await signModel.signListD(partyID, seq);
      if(result.length < 1){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_MYSIGN, result.recordset));
    }

}