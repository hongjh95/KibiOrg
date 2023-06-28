const pool = require('../modules/pool');
const user = 'user';
const groups = 'groups';
const records = 'records';
const adminSet = 'adminset';
const admins = 'admin';

const admin = {
  signup : async (id, password, salt, name) => {
    const fields = 'id, password, salt, name';
    const questions = `?, ?, ?, ?`;
    const values = [id, password, salt, name];
    const query = `INSERT INTO ${adminSet}(${fields}) VALUES(${questions})`;
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
    userCount : async () => {
        const query = `SELECT count(*) as userCount FROM ${user}`;
        try {
          const result = await pool.queryParam(query);
          return result[0].userCount;
        } catch (err) {
          console.log('userCount ERROR : ', err);
          throw err;
        }
},
    groupCount : async () => {
        const query = `SELECT count(*) as groupCount FROM ${groups}`;
        try {
        const result = await pool.queryParam(query);
        return result[0].groupCount;
        } catch (err) {
        console.log('groupCount ERROR : ', err);
        throw err;
        }
    },

    MonthCount : async()=>{
      const query = `select count(*) as countMonth from ${user} where date_format(createdAt, '%Y-%m') = date_format(now(), '%Y-%m')`;
      try{
        const result = await pool.queryParam(query);
        return result[0].countMonth;
      } catch(err){
        console.log('MonthCount ERROR : ', err);
        throw err;
      }
    },

    RidingCount : async()=>{
      const query = `select count(*) as countRiding from ${records} where date_format(date, '%Y-%m-%d') = date_format(now(), '%Y-%m-%d')`
    try{
      const result = await pool.queryParam(query);
      return result[0].countRiding;
    }catch(err){
      console.log('RidingCount ERROR : ', err);
      throw err;
    }
    },

    userList : async()=>{
      const query = `select name, email, date_format(createdAt, '%Y-%m-%d') as createdAt from ${user} order by createdAt desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('userList ERROR : ', err);
      throw err;
    }
    },

    day : async()=>{
      const query = `select name, email, date_format(createdAt, '%Y-%m-%d') as createdAt from ${user} where createdAt = date_format(now(), '%Y-%m-%d') order by createdAt desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('day ERROR : ', err);
      throw err;
    }},

    week : async()=>{
      const query = `SELECT name, email, date_format(createdAt, '%Y-%m-%d') as createdAt FROM user where createdAt between DATE_FORMAT(DATE_SUB(now(), INTERVAL (DAYOFWEEK(now())-0) DAY), '%Y-%m-%d') and DATE_FORMAT(DATE_SUB(now(), INTERVAL (DAYOFWEEK(now())-6) DAY), '%Y-%m-%d') order by createdAt desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('week ERROR : ', err);
      throw err;
    }},

    
    month : async()=>{
      const query = `select name, email, date_format(createdAt, '%Y-%m-%d') as createdAt from ${user} where date_format(createdAt, '%Y-%m') = date_format(now(), '%Y-%m') order by createdAt desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('month ERROR : ', err);
      throw err;
    }},
    
    year : async()=>{
      const query = `select name, email, date_format(createdAt, '%Y-%m-%d') as createdAt from ${user} where date_format(createdAt, '%Y') = date_format(now(), '%Y') order by createdAt desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('year ERROR : ', err);
      throw err;
    }},

    RidingList : async()=>{
      const query = `select (select name from user where userIdx=${records}.userIdx) as name, date_format(date, '%Y-%m-%d') as date, distance, time from ${records} order by date desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('RidingList ERROR : ', err);
      throw err;
    }
    },

    RidingDay : async()=>{
      const query = `select (select name from user where userIdx=${records}.userIdx) as name, date_format(date, '%Y-%m-%d') as date, distance, time from ${records} where date_format(date, '%Y-%m-%d') = date_format(now(), '%Y-%m-%d') order by date desc;`
    try{
      const result = await pool.queryParam(query);
      console.log(result)
      return result;
    }catch(err){
      console.log('RidingDay ERROR : ', err);
      throw err;
    }
    },

    RidingWeek : async()=>{
      const query = `select (select name from user where userIdx=${records}.userIdx) as name, date_format(date, '%Y-%m-%d') as date, distance, time from ${records} where date_format(date, '%Y-%m-%d') between DATE_FORMAT(DATE_SUB(now(), INTERVAL (DAYOFWEEK(now())-0) DAY), '%Y-%m-%d') and DATE_FORMAT(DATE_SUB(now(), INTERVAL (DAYOFWEEK(now())-6) DAY), '%Y-%m-%d') order by date desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('RidingWeek ERROR : ', err);
      throw err;
    }
    },

    RidingMonth : async()=>{
      const query = `select (select name from user where userIdx=${records}.userIdx) as name, date_format(date, '%Y-%m-%d') as date, distance, time from ${records} where date_format(date, '%Y-%m') = date_format(now(), '%Y-%m') order by date desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('RidingMonth ERROR : ', err);
      throw err;
    }
    },

    RidingYear : async()=>{
      const query = `select (select name from user where userIdx=${records}.userIdx) as name, date_format(date, '%Y-%m-%d') as date, distance, time from ${records} where date_format(date, '%Y') = date_format(now(), '%Y') order by date desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('RidingYear ERROR : ', err);
      throw err;
    }
    },
    checkUser : async (id) => {
      const query = `SELECT * FROM ${adminSet} WHERE id="${id}"`;
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
    findById : async (id) => {
      const query = `SELECT * FROM ${adminSet} WHERE id="${id}"`;
      try {
        const result = await pool.queryParam(query);
        return result;
      } catch (err) {
        console.log('checkUser ERROR : ', err);
        throw err;
      }
    },

    postList : async()=>{
      const query = `select idx, name, title, info, date_format(createdAt, '%Y-%m-%d') as createdAt from ${admins} order by date_format(createdAt, '%Y-%m-%d %H:%i:%s') desc;`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('postList ERROR : ', err);
      throw err;
    }
    },
    write : async (name, title, info, createdAt) => {
      const fields = 'name, title, info, createdAt';
      const questions = `?, ?, ?, ?`;
      const values = [name, title, info, createdAt];
      const query = `INSERT INTO ${admins}(${fields}) VALUES(${questions})`;
      try {
        const result = await pool.queryParamArr(query, values);
        const insertId = result.insertId;
        return insertId;
      } catch(err) {
      if (err.errno == 1062) {
        console.log('write ERROR : ', err.errno, err.code);
        throw err;
      }   
    }
    },

    updatePost : async (idx, name, title, info) => {
      const query =`UPDATE ${admins} SET
      title="${title}", info="${info}" where idx=${idx} and name="${name}";`;
      try { 
          const result = await pool.queryParam(query);
          return result;
  } catch (err) {
        console.log(err);
        throw err;
      }
    },

    deletePost : async (idx, name) => {
      const query =`DELETE FROM ${admins}
      where idx=${idx} and name="${name}";`;
      try { 
          console.log(query)
          const result = await pool.queryParam(query);
          return result;
  } catch (err) {
        console.log(err);
        throw err;
      }
    },

    getPost: async(idx)=>{
      const query = `select idx, name, title, info, date_format(createdAt, '%Y-%m-%d') as createdAt from ${admins} where idx=${idx};`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('getPostDetail ERROR : ', err);
      throw err;
    }
    },
    getWriter: async(idx)=>{
      const query = `select a.id from ${admins} s join ${adminSet} a on s.name = a.name where s.idx=${idx};`
    try{
      const result = await pool.queryParam(query);
      return result;
    }catch(err){
      console.log('getPostDetail ERROR : ', err);
      throw err;
    }
    },

    getMonthUser: async()=>{
      const query = `select * from (select date_format(td.SOL_DASH_DATE, '%Y-%m') date, count(u.createdAt) as count from calendar td
      left join user u on (u.createdAt = td.SOL_DASH_DATE) group by date) a where date like concat("%", YEAR(now()), "%")`
    try{
      const result = await pool.queryParam(query);
      list=[]
      if (result.length != 12){
        list.push(10,20,30,20,20,10,20,30)
        for(i=0; i<result.length; i++){
        list.push(result[i].count)
      }
      }
      else{
        for(i=0; i<result.length; i++){
          list.push(result[i].count)
        }
      }
      return list;
    }catch(err){
      console.log('getMonthUser ERROR : ', err);
      throw err;
    }
    },

    getMonthRiding: async()=>{
      const query = `select * from (select date_format(td.SOL_DASH_DATE, '%Y-%m') date, 
      count(r.date) as count from calendar td
      left join records r on (date_format(r.date, '%Y-%m-%d') = td.SOL_DASH_DATE) group by date_format(td.SOL_DASH_DATE, '%Y-%m')) a 
      where date like concat("%", YEAR(now()), "%")`
    try{
      const result = await pool.queryParam(query);
      list=[]
      if (result.length != 12){
        list.push(5,5,10,20,10,20,20,10)
        for(i=0; i<result.length; i++){
        list.push(result[i].count)
      }
      }
      else{
        for(i=0; i<result.length; i++){
          list.push(result[i].count)
        }
      }
      return list;
    }catch(err){
      console.log('getMonthRiding ERROR : ', err);
      throw err;
    }
    },

    sumMonthUser: async()=>{
      const query = `select * from (select date_format(td.SOL_DASH_DATE, '%Y-%m') date, count(u.createdAt) as count from calendar td
      left join user u on (u.createdAt = td.SOL_DASH_DATE) group by date) a where date like concat("%", YEAR(now()), "%")`
    try{
      const result = await pool.queryParam(query);
      li=[]
      list=[]
      if (result.length != 12){
        li.push(5,5,10,20,10,20,20,10)
        for(i=0; i<result.length; i++){
        li.push(result[i].count)
      }
      }
      else{
        for(i=0; i<result.length; i++){
          li.push(result[i].count)
        }
      }
      list.push(li[0])
      for(i=1; i<li.length; i++){
        list.push(list[i-1]+li[i])
      }
      return list;
    }catch(err){
      console.log('sumMonthUser ERROR : ', err);
      throw err;
    }
    },

    sumMonthGroup: async()=>{
      const query = `select * from (select date_format(td.SOL_DASH_DATE, '%Y-%m') date,  
      count(g.groupIdx) as count from calendar td
      left join groups g on (g.createdAt = td.SOL_DASH_DATE) group by date_format(td.SOL_DASH_DATE, '%Y-%m')) a 
      where date like concat("%", YEAR(now()), "%")`
    try{
      const result = await pool.queryParam(query);
      li=[]
      list=[]
      if (result.length != 12){
        li.push(5,5,10,20,10,20,20,10)
        for(i=0; i<result.length; i++){
        li.push(result[i].count)
      }
      }
      else{
        for(i=0; i<result.length; i++){
          li.push(result[i].count)
        }
      }
      list.push(li[0])
      for(i=1; i<li.length; i++){
        list.push(list[i-1]+li[i])
      }
      return list;
    }catch(err){
      console.log('getMonthRiding ERROR : ', err);
      throw err;
    }
    },
}

module.exports = admin;