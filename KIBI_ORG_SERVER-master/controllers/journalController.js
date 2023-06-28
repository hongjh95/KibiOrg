const journalModel = require('../models/journal');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');


module.exports = {
    write : async (req, res) => {
        const partyID = req.partyid;
        const userID = req.userID;
        const {calDay, today, tomorrow} = req.body;
        const file = 1

        const result = await journalModel.write(partyID, userID, calDay, today, tomorrow, file);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_WRITE_JOURNAL, result.recordset));
    },

    getMyJournal : async (req, res) => {
        const partyID = req.partyid;
        const userID = req.userID;
        const date = req.date;
        const isOwner = "Y";

        const result = await journalModel.getMyJournal(partyID, userID, date, isOwner);

        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_MYJOURNAL, result.recordset));

    },


}