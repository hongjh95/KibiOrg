const messageModel = require('../models/message');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');


module.exports = {
    received : async (req, res) => {
        const userID = req.userID;
        console.log("넘어온 userID >>> ", userID)
        const partyID = req.partyid;
        console.log("넘어온 partyID >>> ", partyID)
        const pageNum = req.params.pageNum;
        console.log("넘어온 pageNum >>> ", pageNum)
        const pageSize = 10;
        
        console.log("messageController 21.10.16 Result 전>>> 2")
        const result = await messageModel.received(partyID, userID, pageNum, pageSize);
        console.log("messageController 21.10.16 Result 후>>> 3")
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_MESSAGE_RECEIVED, result.recordset));
    },

    sended : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const pageNum = req.params.pageNum;
        const pageSize = 10;
     
        const result = await messageModel.sended(partyID, userID, pageNum, pageSize);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_MESSAGE_SENDED, result.recordset));
    },

    userList : async (req, res) => {
        const partyID = req.partyid;
     
        const result = await messageModel.userList(partyID);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_USERLIST, result.recordset));
    },

    write : async (req, res) => {
        const userID = req.userID;
        const partyID = req.partyid;
        const {msg_div, r_userID, message, my_self} = req.body;
     
        const result = await messageModel.write(partyID, userID, msg_div, r_userID, message, my_self);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEND_MESSAGE, result.recordset));
    },

}