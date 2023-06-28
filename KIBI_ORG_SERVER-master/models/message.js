const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const userTB = '[TB_USER]'
const partyTB = '[TB_PARTY]'

const message = {
    received : async (partyID, userID, pageNum, pageSize) => {
        try {
          const result = await pool.messageReceived(partyID, userID, pageNum, pageSize);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
        
    },

    sended : async (partyID, userID, pageNum, pageSize) => {
        try {
          const result = await pool.messageSended(partyID, userID, pageNum, pageSize);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
        
    },


    userList : async (partyID) => {
      try {
        const result = await pool.messageUserList(partyID);
        return result;
      } catch (err){
        console.log('Error : ', err);
        throw err;
      }
      
  },

    write : async (partyID, userID, msg_div, r_userID, message, my_self) => {
      try {
        const result = await pool.messageWrite(partyID, userID, msg_div, r_userID, message, my_self);
        return result;
      } catch (err){
        console.log('Error : ', err);
        throw err;
      }

  },


}

module.exports = message;