const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'


const admin = {
    status : async (partyID, date, attendTime) => {
        try {
            const result = await pool.adminStatus(partyID, date, attendTime);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    statusSearch : async (partyID, date, attendTime, userNM) => {
        try {
            const result = await pool.adminStatusSearch(partyID, date, attendTime, userNM);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    task : async (partyID, date) => {
        try {
            const result = await pool.adminTask(partyID, date);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    taskSearch : async (partyID, date, userNM) => {
        try {
            const result = await pool.adminTaskSearch(partyID, date, userNM);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    taskComment : async (partyID, date) => {
        try {
            const result = await pool.taskComment(partyID, date);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    projectList : async (partyID, year) => {
        try {
            const result = await pool.projectList(partyID, year);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    projectEdit : async (partyID, pjt_id, pjt_nm, pjt_f_nm, pjt_s_dt, pjt_e_dt, pjt_customer, pjt_manager, mm, note) => {
        try {
            const result = await pool.projectEdit(partyID, pjt_id, pjt_nm, pjt_f_nm, pjt_s_dt, pjt_e_dt, pjt_customer, pjt_manager, mm, note);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    projectDelete : async (partyID, pjt_id) => {
        try {
            const result = await pool.projectDelete(partyID, pjt_id);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    annualList : async (partyID, year) => {
        try {
            const result = await pool.annualList(partyID, year);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    annualEdit : async (partyID, year, userID, editID, basic, add, use) => {
        try {
            const result = await pool.annualEdit(partyID, year, userID, editID, basic, add, use);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    
}

module.exports = admin;

