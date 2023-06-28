const companyModel = require('../models/company');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');


module.exports = {
    search : async (req, res) => {
        const comName = req.params.comName;
        const result = await companyModel.search(comName);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_COMPANY, result));
    },

    create : async(req, res) => {
        const { partyNM, regID, partyADD, partyNUMBER } = req.body;
        console.log("넘어온 파티이름 : " + partyNM);
        const result = await companyModel.create(partyNM, regID, partyADD, partyNUMBER);

        if (result.length < 1){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.FAIL_CREATE_COMPANY));
            return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_CREATE_COMPANY, result.recordset));
    }
}