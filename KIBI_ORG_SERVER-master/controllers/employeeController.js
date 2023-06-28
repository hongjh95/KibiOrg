const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const employeeModels = require("../models/employee");
const userModel = require("../models/user");

module.exports = {
    getEmployeeList : async(req, res) => {
        const partyID = req.partyid;
        const userID = "";
        const result = await employeeModels.employeeList(partyID, userID);
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
    },

    getEmployeeUser : async(req, res) => {
        const partyID = req.partyid;
        const userID = req.headers.user_id;
        console.log("heders",req.headers);
        console.log("userID",userID);
        const result = await employeeModels.employeeList(partyID, userID);
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
    },

    getEmployeeSearch : async(req, res) => {
        const partyID = req.partyid;
        const userID = req.body.USER_ID;
        const result = await employeeModels.employeeList(partyID, userID);
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
    },

    postEmployeeUser : async(req, res) => {
        const partyID = req.partyid;

        const { userID, edit_name_ko, edit_name_en, DEPT_CD, rank, enter_date, phone, edit_email } = req.body;
        console.log(req.body);
        if (await userModel.checkUser(userID)) {
            res.status(statusCode.BAD_REQUEST)
              .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
            return;
        }
        
        const result = await employeeModels.postEmployeeUser(partyID, userID, edit_name_ko, edit_name_en, DEPT_CD, rank, enter_date, phone, edit_email );
        console.log(result);
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
    },

    putEmployeeUserEdit : async(req, res) => {
        const partyID = req.partyid;
        const { userID, edit_name_ko, edit_name_en, DEPT_CD, rank, phone, edit_email, AS_ASSIGN_TASK_IF, AS_NOTE_DC, AS_IS_ADMIN, AS_PHOTO_FILE_SEQ, AS_MYPARTYLEV, enter_date, AS_BIRTHDAY_DT, AS_PHONE1_NUM, AS_EMAIL2_IF, AS_POST_NO, AS_JUSO1_IF, AS_JUSO2_IF, AS_ANIV1_NM, AS_ANIV2_NM, AS_ANIV1_DT, AS_ANIV2_DT, exit_date } = req.body;

        if(!userID || !partyID){
          console.log("오류")
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.INVALID_TOKEN));
          return;
        }

        const result = await employeeModels.putEmployeeUserEdit( partyID, userID, edit_name_ko, edit_name_en, DEPT_CD, rank, phone, edit_email, AS_ASSIGN_TASK_IF, AS_NOTE_DC, AS_IS_ADMIN, AS_PHOTO_FILE_SEQ, AS_MYPARTYLEV, enter_date, AS_BIRTHDAY_DT, AS_PHONE1_NUM, AS_EMAIL2_IF, AS_POST_NO, AS_JUSO1_IF, AS_JUSO2_IF, AS_ANIV1_NM, AS_ANIV2_NM, AS_ANIV1_DT, AS_ANIV2_DT, exit_date);
        console.log(result);
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
    },

    putEmployeeUserResetPassword : async(req, res) => {
      const partyID = req.partyid;
      const applyID = req.body.userID;

      const result = await employeeModels.putEmployeeUserResetPassword(partyID, applyID);

      if (result.length < 1 ){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      return;
      }
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
  },

  putEmployeeUserPermitY : async(req, res) => {
        const partyID = req.partyid;
        const applyID = req.body.applyId
        const result = await employeeModels.putEmployeeUserPermitY(partyID, applyID);

        if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
    },

  deleteEmployeeUserPermit: async(req, res) => {
        const partyID = req.partyid;
        const applyID = req.body.applyId
        const result = await employeeModels.deleteEmployeeUserPermit(partyID, applyID);

        if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_EMPLOYEE_LIST, result.recordset));
    }
}