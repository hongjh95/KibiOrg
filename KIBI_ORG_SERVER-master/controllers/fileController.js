const fileModel = require('../models/file');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');


module.exports = {
    fileList : async (req, res) => {
        const fileSeq = req.headers.fileseq;
        
        const result = await fileModel.fileList(fileSeq);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_FILELIST, result.recordset));
    },
}