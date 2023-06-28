const adminModel = require('../models/admin');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');


module.exports = {
    status : async (req, res) => {
        const partyID = req.partyid;
        const {date, attendTime} = req.body;

        const result = await adminModel.status(partyID, date, attendTime);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ADMIN_STATUS, result.recordset));
    },

    statusSearch : async (req, res) => {
      const partyID = req.partyid;
      const {date, attendTime, userNM} = req.body;
      console.log("---------------------");
      console.log(userNM);

      const result = await adminModel.statusSearch(partyID, date, attendTime, userNM);
      
      if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }
  
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ADMIN_STATUS, result.recordset));
  },

    task : async (req, res) => {
        const partyID = req.partyid;
        const date = req.body.date;

        const result = await adminModel.task(partyID, date);
        
        if (result.length < 1 ){
            res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          return;
        }
    
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ADMIN_TASK, result.recordset));
    },

    taskSearch : async (req, res) => {
      const partyID = req.partyid;
      const date = req.body.date;
      const userNM = req.body.userNM
      console.log(req.body.date);
      console.log(userNM);

      const result = await adminModel.taskSearch(partyID, date, userNM);
      console.log(result);
      
      if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }
  
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ADMIN_TASK, result.recordset));
    },

    taskComment : async (req, res) => {
      const partyID = req.partyid;
      const date = req.headers.date;

      const result = await adminModel.taskComment(partyID, date);
      
      if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }
  
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ADMIN_TASK, result.recordset));
  },

    projectList : async (req, res) => {
      const partyID = req.partyid;
      const year = req.headers.year;

      const result = await adminModel.projectList(partyID, year);
      
      if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }
  
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ADMIN_PROJECTLIST, result.recordset));
  },

    projectEdit : async (req, res) => {
      const partyID = req.partyid;
      const pjt_id = req.headers.pjt_id;
      const {pjt_nm, pjt_f_nm, pjt_s_dt, pjt_e_dt, pjt_customer, pjt_manager, mm, note} = req.body;
      console.log(pjt_f_nm)

      const result = await adminModel.projectEdit(partyID, pjt_id, pjt_nm, pjt_f_nm, pjt_s_dt, pjt_e_dt, pjt_customer, pjt_manager, mm, note);

      if (result.length < 1 ){
          res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        return;
      }

      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_PUT_ADMIN_PROJECTEDIT, result));
    },

    projectDelete : async (req, res) => {
    const partyID = req.partyid;
    const pjt_id = req.headers.pjt_id;
    
    const result = await adminModel.projectDelete(partyID, pjt_id);
    
    if (result.length < 1 ){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_DELETE_ADMIN_PROJECT, result));
    },

    annualList : async (req, res) => {
    const partyID = req.partyid;
    const year = req.headers.year;
    
    const result = await adminModel.annualList(partyID, year);
    
    if (result.length < 1 ){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_GET_ADMIN_PROJECTLIST, result.recordset));
    },

  annualEdit : async (req, res) => {
    const editID = req.userID;
    const partyID = req.partyid;
    const {year, userID, basic, add, use} = req.body;

    const result = await adminModel.annualEdit(partyID, year, userID, editID, basic, add, use);

    if (result.length < 1 ){
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
      return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_PUT_ANNUAL, result));
  },
    
}