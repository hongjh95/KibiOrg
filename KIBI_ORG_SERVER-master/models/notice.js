const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const userTB = '[TB_USER]'

const notice = {
    notice : async (partyID) => {
        try {
            const result = await pool.getNotice(partyID);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    logout : async (userID, partyID) => {
        const query = `UPDATE ${dbInfo}.${userTB} SET [FCM_TOKEN] = '' WHERE USER_ID = '${userID}' AND PARTY_ID = '${partyID}'`;

        try {
            const result = await pool.queryParam(query);
            if (result.rowsAffected[0] === 0) {
              return false;
            } 
            return true;
        } catch (err) {
            console.log('logout Err : ', err.errno, err.code);
            throw err;
        }
    },


}

module.exports = notice;