const pool = require('../modules/pool');
const table2 = 'user'
const table = 'members'
const table3 = 'records'
const member = {
    
    records : async (userIdx, distance, time, avgSpeed, date, dep, arr, gpx) => {
        const fields = 'userIdx, distance, time, avgSpeed, date, dep, arr, gpx';
        const questions = `?, ?, ?, ?, ?, ?, ?, ?`;
        const values = [userIdx, distance, time, avgSpeed, date, dep, arr, gpx];
        const query = `INSERT INTO ${table3}(${fields}) VALUES(${questions})`;
        try {
          const result = await pool.queryParamArr(query, values);
          const insertId = result.insertId;
          return insertId;
        } catch(err) {
        if (err.errno == 1062) {
          console.log('record ERROR : ', err.errno, err.code);
          throw err;
        }} },

      updateUser : async (userIdx,groupIdx, distance, time, avgSpeed) => {
        const query =`UPDATE ${table2} JOIN ${table} on ${table}.userIdx = ${table2}.userIdx SET
        ${table2}.distance=${table2}.distance+${distance}, 
        ${table2}.time=(select ADDTIME(${table2}.time, "${time}")),
        ${table2}.avgSpeed=${table2}.avgSpeed+${avgSpeed}, 
        ${table2}.count=${table2}.count+1
        where ${table}.groupIdx=${groupIdx} and ${table}.available=2 and ${table2}.userIdx = ${userIdx};`;
        try { 
            const result = await pool.queryParam(query);
            return result;
    } catch (err) {
          console.log(err);
          throw err;
        }
      },

      available : async (userIdx, groupIdx, available) => {
        const query =`UPDATE ${table} SET available=${available} where groupIdx=${groupIdx} and userIdx = ${userIdx};`;
        try { 
            const result = await pool.queryParam(query);
            return result;
    } catch (err) {
          console.log(err);
          throw err;
        }
      },

      input : async (userIdx, groupIdx, lat, lon) => {
        const query =`UPDATE ${table} SET lat=${lat}, lon=${lon} where groupIdx=${groupIdx} and userIdx = ${userIdx};`;
        try { 
            const result = await pool.queryParam(query);
            return result;
    } catch (err) {
          console.log(err);
          throw err;
        }
      },

      output : async (userIdx,groupIdx) => {
        const query =`SELECT ${table}.groupIdx, (select name from user where userIdx = ${table}.userIdx) as name, ${table}.lat, ${table}.lon FROM ${table} 
        join groups on ${table}.groupIdx = groups.groupIdx where ${table}.groupIdx=${groupIdx} and ${table}.available=2 and members.userIdx!=${userIdx};`;
        try { 
            const result = await pool.queryParam(query);
            return result;
    } catch (err) {
          console.log(err);
          throw err;
        }
      },
}

module.exports = member;