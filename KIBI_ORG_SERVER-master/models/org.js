const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const userTB = '[TB_USER]'

const org = {
    list : async (partyID, userID) => {
        try {
            const result = await pool.getOrgList(partyID, userID);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    attend : async (userID, partyID, date) => {
        try {
          const result = await pool.orgAttend(userID, partyID, date);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
      },

      journal : async (partyID, userID, date, isOwner) => {
        try {
            const result = await pool.orgJournal(partyID, userID, date, isOwner);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    comment : async (seq, userID, comment) => {
        try {
            const result = await pool.orgComment(seq, userID, comment);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    commentRead : async (partyID, userID, seq) => {
        try {
            const result = await pool.orgCommentRead(partyID, userID, seq);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },
}

module.exports = org;