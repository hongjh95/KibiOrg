const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const userTB = '[TB_USER]'
const insaTB = '[TB_INSA_CARD_000]'
const partyTB = '[TB_PARTY]'

const user = {
    signupA : async (partyID, userID, userPW, userName, userNameEn, userPhone, userEmail, permit, admin) => {
        const fields = '(PARTY_ID, USER_ID, PASSWORD_IF, USER_NM, USER_E_NM, PHONE_IF, EMAIL_IF, PERMIT_YN, IS_ADMIN, DEPT_CD)';
        const fields2 = '(PARTY_ID, USER_ID)';
        const values = [`'${partyID}'`, `'${userID}'`, `'${userPW}'`, `'${userName}'`, `'${userNameEn}'`, `'${userPhone}'`, `'${userEmail}'`, `'${permit}'`, `'${admin}'`, '200'];
        const values2 = [`'${partyID}'`, `'${userID}'`];
        const query = `INSERT INTO ${dbInfo}.${userTB} ${fields} VALUES (${values})`;
        const query2 = `INSERT INTO ${dbInfo}.${insaTB} ${fields2} VALUES (${values2})`;
        try {
            const result = await pool.queryParam(query);
            const result2 = await pool.queryParam(query2);
            if (result.rowsAffected[0] === 0 || result2.rowsAffected[0] === 0) {
              return false;
            } 
            return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup Err : ', err.errno, err.code);
                throw err;
            }
        }
    },

    checkUser : async (userID) => {
        const query = `SELECT * FROM ${dbInfo}.${userTB} WHERE USER_ID='${userID}'`;
        try {
          const result = await pool.queryParam(query);
          console.log(result.rowsAffected)
          if (result.rowsAffected[0] === 0) {
            return false;
          } 
          return true;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

    getUserById : async (userID) => {
        const query = `SELECT * FROM ${dbInfo}.${userTB} WHERE USER_ID='${userID}'`;
        try {
          return await pool.queryParam(query);
        } catch (err) {
          console.log('getUserByIdx ERROR : ', err);
          throw err;
        }
      },

    findByUserID : async (userID) => {
        const query = `SELECT * FROM ${dbInfo}.${userTB} WHERE USER_ID='${userID}'`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

      updateRefreshToken: async (userID, refreshToken) => {
        const query = `UPDATE ${dbInfo}.${userTB} SET [REFRESHTOKEN] = '${refreshToken}' WHERE USER_ID = '${userID}'`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('updateRefreshToken ERROR : ', err);
            throw err;
        }
    
      }, 
    
      password: async (userID, password, salt) => {
        const query = `UPDATE ${dbInfo}.${userTB} SET password = '${password}', salt = '${salt}' WHERE USER_ID = '${userID}'`;
        try {
            const result = await pool.queryParam(query);
        } catch (err) {
            console.log('password ERROR : ', err);
            throw err;
        }
    
      }, 

      getInfo : async (userID) => {
        const query = `SELECT A.USER_ID, A.USER_NM, A.EMAIL_IF, B.PARTY_NM, B.PARTY_ID, A.IS_ADMIN, A.MY_PARTY_LEV FROM ${dbInfo}.${userTB} as A LEFT OUTER JOIN ${dbInfo}.${partyTB} as B ON A.PARTY_ID = B.PARTY_ID WHERE USER_ID = '${userID}'`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

      fcmToken : async (userID, partyID, fcmToken) => {
        const query = `UPDATE ${dbInfo}.${userTB} SET [FCM_TOKEN] = '${fcmToken}' WHERE USER_ID = '${userID}' AND PARTY_ID = '${partyID}'`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('put FCM_TOKEN ERROR : ', err);
          throw err;
        }
      },

      attendStart : async (userID, partyID, ip, location) => {
        try{
          const result = await pool.attendStart(userID, partyID, ip, location);
          return result;
        } catch (err){
          console.log('attendStart Error : ' , err);
          throw err;
        }
      },

      attendEnd : async (userID, partyID, ip, location) => {
        try{
          const result = await pool.attendEnd(userID, partyID, ip, location);
          return result;
        } catch (err){
          console.log('attendEnd Error : ' , err);
          throw err;
        }
      },

      myInfo : async (userID, partyID) => {
        try{
          const result = await pool.myInfo(userID, partyID);
          return result;
        } catch (err) {
          console.log('Error : ' , err);
          throw err;
        }
      },

      depInfo : async (partyID) => {
        try {
          const result = await pool.depInfo(partyID);
          return result;
        } catch (err) {
          console.log('Error : ', err);
          throw err;
        }
      },


      editInfo : async (userID, partyID, userName, userEName, userDep, userPos, userPhone, userEmail, userWork) => {
        try {
          const result = await pool.editInfo(userID, partyID, userName, userEName, userDep, userPos, userPhone, userEmail, userWork);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
      },

      attendStatus : async (userID, partyID) => {
        try {
          const result = await pool.attendStatus(userID, partyID);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
      },

      myAttend : async (userID, partyID, date) => {
        try {
          const result = await pool.myAttend(userID, partyID, date);
          return result;
        } catch (err){
          console.log('Error : ', err);
          throw err;
        }
      },


}

module.exports = user;