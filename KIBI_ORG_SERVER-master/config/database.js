const mssql = require('mssql');

// const dbConfig = {
//     user : 'kibi',
//     password : 'kibi0625',
//     server : '192.168.0.14',
//     database : 'KIBI_ORG2',
//     stream : true,
//     trustServerCertificate: true
// }

const dbConfig = {
    user : 'orgkibidb_mssql',
    password : 'kibi0625',
    server : 'sql16ssd-013.localnet.kr',
    database : 'orgkibidb_mssql',
    stream : true,
    trustServerCertificate: true
}

module.exports = new mssql.ConnectionPool(dbConfig);

