const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'

const file = {
    fileList : async (fileSeq) => {
        try {
            const result = await pool.getFileList(fileSeq);
            return result;
        } catch (err){
            console.log('Error : ', err);
            throw err;
        }
    },

   
}

module.exports = file;

