const approveModel = require('../models/approve');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');


module.exports = {
    for : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const status = "02";
        const where = "ALL";
        const keyword = '';

        const result = await approveModel.for(partyID, userID, status, where, keyword);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_APPROVE_FOR, result.recordset));
    },

    forDetail : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const seq = req.params.seq;

        const result = await approveModel.forDetail(partyID, userID, seq);

        if (result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_APPROVE_FOR_DETAIL, result.recordset));
    },

    getStatus : async (req, res) => {
        const partyID = req.partyid;
        const seq = req.params.seq;

        const result = await approveModel.getStatus(partyID, seq);

        if (result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_APPROVE_STATUS, result.recordset));
    },

    doApprove : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const {seq, idea} = req.body;
        const period = 0;

        const result = await approveModel.doApprove(partyID, seq, userID, period, idea);

        if (result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_APPROVE, result.recordset));
    },

    noApprove : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const {seq, idea} = req.body;

        const result = await approveModel.noApprove(partyID, seq, userID, idea);

        if (result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_APPROVE, result.recordset));
    },


    done : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const status = "";
        const where = "ALL";
        const keyword = '';

        const result = await approveModel.done(partyID, userID, status, where, keyword);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_APPROVE_FOR, result.recordset));
    },

    written : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const status = "";
        const where = "ALL";
        const keyword = '';

        const result = await approveModel.written(partyID, userID, status, where, keyword);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_APPROVE_WRITTEN, result.recordset));
    },

    submit : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const {seq, rpt, s_date, e_date, title, note, file, a1_code, a1_nm, a3_code, a3_code_02} = req.body;

        const result = await approveModel.submit(partyID, userID, seq, rpt, s_date, e_date, title, note, file, a1_code, a1_nm, a3_code, a3_code_02);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_POST_APPROVE_OTHER_GOODS, result.recordset));
    },

    cancel : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const seq = req.body.seq;

        const result = await approveModel.cancel(partyID, userID, seq);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_CANCEL_APPROVAL, result));
    },

    delete : async (req, res) => {
        const partyID = req.partyid;
        const seq = req.body.seq;

        const result = await approveModel.delete(partyID, seq);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_DELETE_APPROVAL, result));
    },
    
}