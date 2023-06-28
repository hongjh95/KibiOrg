const pool = require('../modules/pool');
const table = 'records'
const record = {
    record : async (userIdx, date) => {

        const query = `SELECT idx, time, distance, avgSpeed, date_format(date, '%Y.%m.%d %H:%i') as date, dep, arr,gpx FROM ${table} 
        WHERE userIdx = ${userIdx} and date_format(date, '%Y')=date_format('${date}', '%Y') order by date desc`;
        try {
          const result = await pool.queryParam(query);

          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

      gpx : async (idx) => {

        const query = `SELECT time, distance, avgSpeed, date_format(date, '%Y.%m.%d %H:%i') as date, dep, arr, gpx FROM ${table} 
        WHERE idx=${idx}`;
        try {
          const result = await pool.queryParam(query);

          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

      day : async (userIdx, date) => {
        const query = `SELECT date_format(${table}.date, '%Y.%m.%d') as date, SEC_TO_TIME(SUM(TIME_TO_SEC(time))) as time, round(sum(distance),1) as distance, 
        round(avg(avgSpeed),1) as avgSpeed, count(date) as count FROM ${table} WHERE userIdx = ${userIdx} and date_format(date, '%Y')=date_format('${date}', '%Y') group by date_format(${table}.date, '%Y.%m.%d') order by date desc`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

      week : async (userIdx) => {
        const query = `SELECT concat(DATE_FORMAT(DATE_SUB(date_format(${table}.date, '%Y.%m.%d'), 
        INTERVAL (WEEKDAY(date_format(${table}.date, '%Y.%m.%d'))) DAY), '%Y.%m.%d'),' - ',
        DATE_FORMAT(DATE_SUB(date_format(${table}.date, '%Y.%m.%d'), 
        INTERVAL (WEEKDAY(date_format(${table}.date, '%Y.%m.%d'))-6) DAY), '%Y.%m.%d')) as date,
        SEC_TO_TIME(SUM(TIME_TO_SEC(time))) as time,
        round(sum(distance),1) as distance,  
        round(avg(avgSpeed),1) as avgSpeed,
        count(date) as count
        FROM records where userIdx=${userIdx}
        GROUP BY DATE_FORMAT(DATE_SUB(date_format(records.date, '%Y.%m.%d'), 
        INTERVAL (WEEKDAY(date_format(records.date, '%Y.%m.%d'))) DAY), '%Y.%m.%d') order by date desc;`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

      month : async (userIdx) => {
        const query = `SELECT DATE_FORMAT(${table}.date,'%Y.%m') as date, SEC_TO_TIME(SUM(TIME_TO_SEC(time))) as time,
        round(sum(distance),1) as distance, round(avg(avgSpeed),1) as avgSpeed,
        count(date) as count
        FROM ${table} where userIdx=${userIdx}
        GROUP BY DATE_FORMAT(${table}.date,'%Y.%m') order by date desc ;`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },

      year : async (userIdx) => {
        const query = `SELECT year(${table}.date) as date, SEC_TO_TIME(SUM(TIME_TO_SEC(time))) as time,
        round(sum(distance),1) as distance, round(avg(avgSpeed),1) as avgSpeed,
        count(date) as count 
        FROM ${table} where userIdx=${userIdx}
        GROUP BY year(${table}.date) order by date desc;`;
        try {
          const result = await pool.queryParam(query);
          return result;
        } catch (err) {
          console.log('checkUser ERROR : ', err);
          throw err;
        }
      },
}

module.exports = record;
