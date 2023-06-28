const pool = require('../modules/pool');
// const dbInfo = '[KIBI_ORG2].[dbo]'
const dbInfo = '[orgkibidb_mssql].[dbo]'
const companyName = '[PARTY_NM]';
const companyID = '[PARTY_ID]';
const companyAdd = '[PARTY_ADD]';
const companyNum = '[PARTY_NUMBER]';
const table = '[TB_PARTY]'

const company = {
    search : async (comName) => {
        // const query = `SELECT ${companyID}, ${companyName} from ${dbInfo}.${table}`;
        const query = `SELECT ${companyName}, ${companyID}, ${companyAdd}, ${companyNum} FROM ${dbInfo}.${table} WHERE ${companyName} = '${comName}'`;
        try {
            const result = await pool.queryParam(query);
            return result.recordset;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('Company search Err : ', err.errno, err.code);
                throw err;
            }
        }
    },

    create : async(partyNM, regID, partyADD, partyNUMBER) => {
        try{
            const result = await pool.createCompany(partyNM, regID, partyADD, partyNUMBER);
            return result;
          } catch (err){
            console.log('attendEnd Error : ' , err);
            throw err;
          }
    },
}

module.exports = company;

