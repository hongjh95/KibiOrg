const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const userTB = '[TB_USER]'
const partyTB = '[TB_PARTY]'

const sign = {
    signList : async (partyID, userID) => {
        try {
          const result = await pool.signList(partyID, userID);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
        
    },

    getXList : async (partyID, userID, seq) => {
        try {
            const result = await pool.getXList(partyID, userID, seq);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    makeSign : async (partyID, userID, signName) => {
        try {
            const result = await pool.makeSign(partyID, userID, signName);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    deleteList : async (partyID, seq, flag) => {
        try {
            const result = await pool.deleteList(partyID, seq, flag);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    putList : async (partyID, seq, userID, sort) => {
        try {
            const result = await pool.putList(partyID, seq, userID, sort);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    signListD : async (partyID, seq) => {
        try {
            const result = await pool.signListD(partyID, seq);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    }

}

module.exports = sign;