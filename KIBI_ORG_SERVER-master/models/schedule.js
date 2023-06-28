const { partyID } = require('../modules/middlewares');
const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const partyTB = '[TB_PARTY]'

const schedule = {

    scheduleList : async (partyID, calyearDt, userID) => {
        try {
            const result = await pool.scheduleList(partyID, calyearDt, userID);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    },


    scheduleUser : async(partyId, pjtId, yyyy) => {
        try {
            const result = await pool.scheduleUser(partyId, pjtId, yyyy);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    },

    scheduleUserCount : async (pjtId, partyID) => {
        try {
            const result = await pool.getScheduleUserCount(pjtId, partyID);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    }

}

module.exports = schedule;