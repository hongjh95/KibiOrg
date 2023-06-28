const pool = require('../modules/pool');
const table = 'user';
const table2 = 'groups';
const table3 = 'members';

const user = {
  signup : async (email,  password, salt, name, createdAt) => {
    const fields = 'email, password, salt, name, createdAt';
    const questions = `?, ?, ?, ?, ?`;
    const values = [email, password, salt, name, createdAt];
    const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      const insertId = result.insertId;
      return insertId;
    } catch(err) {
    if (err.errno == 1062) {
      console.log('signup ERROR : ', err.errno, err.code);
      throw err;
    }   
  }
  },
  profile : async (userIdx) => {
    const query = `SELECT email, name FROM ${table} WHERE userIdx="${userIdx}"`;
    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log('profile ERROR : ', err);
      throw err;
    }
  },
  checkUser : async (email) => {
    const query = `SELECT * FROM ${table} WHERE email="${email}"`;
    try {
      const result = await pool.queryParam(query);
      if (result.length === 0) {
        return false;
      } 
      return true;
    } catch (err) {
      console.log('checkUser ERROR : ', err);
      throw err;
    }
  },
  findByUserEmail : async (email) => {
    const query = `SELECT * FROM ${table} WHERE email="${email}"`;
    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log('checkUser ERROR : ', err);
      throw err;
    }
  },
  getInfo : async (email) => {
    const query = `SELECT email, name FROM ${table} WHERE email="${email}"`;
    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log('checkUser ERROR : ', err);
      throw err;
    }
  },
  getUserByEmail : async (idx) => {
    const query = `SELECT * FROM ${table} WHERE userIdx=${idx}`;
    try {
const result = await pool.queryParam(query);
      return result[0].userIdx;
    } catch (err) {
      console.log('getUserById ERROR : ', err);
      throw err;
    }
  },
  getUserByIdx : async (idx) => {
    const query = `SELECT * FROM ${table} WHERE userIdx=${idx}`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('getUserByIdx ERROR : ', err);
      throw err;
    }
  },
  withdrawal : async (userIdx) => {
    const query = `DELETE FROM ${table} WHERE userIdx = ${userIdx} `;
    try{
      const result = await pool.queryParam(query);
      if (result.length === 0) {
        return false;
      } 
      return true;
    } catch (err) {
      console.log('withdrawal ERROR : ', err);
      throw err;
    }
  },

  myGroup: async (userIdx) => {
    const query = `select ${table3}.groupIdx, ${table3}.name,
    (select count(*) from ${table3} where groupIdx=${table2}.groupIdx) as count,
    (select name from user where userIdx=${table2}.userIdx) as leader from ${table3} join ${table2} 
    on ${table3}.groupIdx = ${table2}.groupIdx where ${table3}.userIdx = ${userIdx};`;
    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log(err);
    }

  },

  updateRefreshToken: async (userIdx, refreshToken) => {
    const query = `UPDATE ${table} SET refreshToken = "${refreshToken}" WHERE userIdx = ${userIdx}`;
    try {
        const result = await pool.queryParam(query);
    } catch (err) {
        console.log('checkUser ERROR : ', err);
        throw err;
    }

  }, 

  password: async (userIdx, password, salt) => {
    const query = `UPDATE ${table} SET password = "${password}", salt = "${salt}" WHERE userIdx = ${userIdx}`;
    try {
        const result = await pool.queryParam(query);
    } catch (err) {
        console.log('checkUser ERROR : ', err);
        throw err;
    }

  }, 

}

module.exports = user;
