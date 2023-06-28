const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'


const approve = {
    for : async (partyID, userID, status, where, keyword) => {
        try {
            const result = await pool.approveFor(partyID, userID, status, where, keyword);
            return result;
          } catch (err){
            console.log('Error : ', err);
            throw err;
          }
    },

    forDetail : async (partyID, userID, seq) => {
        try {
            const result = await pool.approveForDetail(partyID, userID, seq);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    getStatus : async (partyID, seq) => {
        try {
            const result = await pool.getStatus(partyID, seq);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    doApprove : async (partyID, seq, userID, period, idea) => {
        try {
            const result = await pool.doApprove(partyID, seq, userID, period, idea);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    noApprove : async (partyID, seq, userID, idea) => {
        try {
            const result = await pool.noApprove(partyID, seq, userID, idea);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    done : async (partyID, userID, status, where, keyword) => {
        try {
            const result = await pool.approveDone(partyID, userID, status, where, keyword);
            return result;
          } catch (err){
            console.log('Error : ', err);
            throw err;
          }
    },

    written : async (partyID, userID, status, where, keyword) => {
        try {
            const result = await pool.written(partyID, userID, status, where, keyword);
            return result;
          } catch (err){
            console.log('Error : ', err);
            throw err;
          }
    },

    submit : async (partyID, userID, seq, rpt, s_date, e_date, title, note, file, a1_code, a1_nm, a3_code, a3_code_02) => {
        try {
            const result = await pool.submit(partyID, userID, seq, rpt, s_date, e_date, title, note, file, a1_code, a1_nm, a3_code, a3_code_02);
            return result;
          } catch (err){
            console.log('Error : ', err);
            throw err;
          }
    },

    cancel : async (partyID, userID, seq) => {
        try {
            const result = await pool.cancel(partyID, userID, seq);
            return result;
          } catch (err){
            console.log('Error : ', err);
            throw err;
          }
    },

    delete : async (partyID, seq) => {
        try {
            const result = await pool.delete(partyID, seq);
            return result;
          } catch (err){
            console.log('Error : ', err);
            throw err;
          }
    },


}

module.exports = approve;

