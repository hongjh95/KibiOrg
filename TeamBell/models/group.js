const { d } = require('hangul-js');
const pool = require('../modules/pool');
const table = 'groups'
const table2 = 'members'

const group = {
    //그룹 생성할 때
    make : async (userIdx, name, consonantVowel, password, info, createdAt) => {
        const fields = 'userIdx, name, consonantVowel, password, info, createdAt';
        const questions = `?, ?, ?, ?, ?, ?`;
        const values = [userIdx, name, consonantVowel, password, info, createdAt];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
          const result = await pool.queryParamArr(query, values);
          return result.insertId;
        } catch (err) {
          console.log(err);
          throw err;
        }
      },

    //리더 외 다른 참여자가 그룹 가입할 때
    join : async (groupIdx, name, userIdx) => {
    const fields = 'groupIdx, name, userIdx';
    const questions = `?, ?, ?`;
    const values = [groupIdx, name, userIdx];
    const query =`INSERT INTO ${table2}(${fields}) VALUES(${questions});`; 
    try {
        const result = await pool.queryParamArr(query, values);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
    },

    //해당 그룹 정보 가져오기
    member : async (groupIdx) => {
        const query = `SELECT userIdx FROM ${table2} WHERE groupIdx = ${groupIdx};`;
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },


    //그룹 소개 가져오기
    info : async (groupIdx) => {
        const query = `SELECT info FROM ${table} WHERE groupIdx = ${groupIdx};`;
        try{
            const result = await pool.queryParam(query);
            return result[0].info;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    groupIdx : async (name, userIdx) => {
        const query = `SELECT * FROM ${table} WHERE name = "${name}" and userIdx = ${userIdx};`;
        try{
            const result = await pool.queryParamArr(query);
            return result[result.length-1].groupIdx;

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    groupIdx2 : async (groupIdx) => {
        const query = `SELECT name FROM ${table} WHERE groupIdx = ${groupIdx};`;
        try{
            const result = await pool.queryParamArr(query);
            return result[0].name;

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    password : async (password, groupIdx) => {
        const query = `SELECT password FROM ${table} WHERE groupIdx = "${groupIdx};"`;
        try{
            const result = await pool.queryParamArr(query);
            if (password === result[0].password){
                return true;                
            }
            else
            {return -1;}
            

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    groupList : async () => {
        const query = `select distinct ${table}.groupIdx, ${table}.name,
        (select count(*) from ${table2} where groupIdx=${table}.groupIdx) as count,
        (select name from user where userIdx=${table}.userIdx) as leader, ${table}.info from ${table2} join ${table}
        on ${table2}.groupIdx = ${table}.groupIdx  ;`;
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    search : async (name, userIdx) => {
        const query = `select distinct ${table2}.groupIdx, ${table2}.name,
        (select count(*) from ${table2} where groupIdx=${table}.groupIdx) as count,
        (select name from user where userIdx=${table}.userIdx) as leader from ${table2} join ${table} 
        on ${table2}.groupIdx = ${table}.groupIdx 
        WHERE ${table}.consonantVowel LIKE '%${name}%'`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
      delete : async (userIdx, groupIdx) => {
        const query = `DELETE FROM ${table2} WHERE userIdx = ${userIdx} and groupIdx = ${groupIdx}`;
        try{
          const result = await pool.queryParam(query);
          if (result.length === 0) {
            return false;
          } 
          return true;
        } catch (err) {
          console.log('delete ERROR : ', err);
          throw err;
        }
      },
}

module.exports = group;