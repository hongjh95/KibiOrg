const mysql = require('promise-mysql');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'kibi0625',
    database: 'teambell'
}

module.exports = mysql.createPool(dbConfig);
