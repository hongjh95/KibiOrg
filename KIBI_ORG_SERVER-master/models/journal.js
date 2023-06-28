const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const userTB = '[TB_USER]'
const partyTB = '[TB_PARTY]'

const journal = {
    write : async (partyID, userID, calDay, today, tomorrow, file) => {
        try {
          const result = await pool.journalWrite(partyID, userID, calDay, today, tomorrow, file);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
        
    },

    getMyJournal : async (partyID, userID, date, isOwner) => {
        try {
            const result = await pool.getMyJournal(partyID, userID, date, isOwner);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

    
}

module.exports = journal;