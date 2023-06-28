const pool = require('../modules/pool');
const table = 'user';

const social = {
    signin : async (id) => {
        const query = `SELECT token FROM ${table} WHERE email = "${id}"`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('google login ERROR : ', err);
          throw err;
        }
      },
    
      updateToken : async (email, token) => {
        const query = `UPDATE ${table} SET token = "${token}" WHERE email = "${email}"`;
        try {
            const result = await pool.queryParam(query);
		const query2 = `SELECT userIdx FROM ${table} WHERE email="${email}"`;
		const result2 = await pool.queryParam(query2);
            return result2[0].userIdx
        } catch (err) {
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    
      }, 

      insertUserIntoDB : async (email, password, salt, name, sub, token) => {
        const fields = 'email,password, salt, name, id, token';
        const questions = `?, ?, ?, ?, ?, ?`;
        const values = [email, password, salt,  name, sub, token];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
          const result = await pool.queryParamArr(query, values);
          const insertId = result.insertId;
          return insertId;
        } catch(err) {
        if (err.errno == 1062) {
          console.log('google login ERROR : ', err.errno, err.code);
          throw err;
        }   
      }
      }
}
module.exports = social;
