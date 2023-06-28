const poolPromise = require('../config/database');
const sql = require('mssql');

module.exports = {
    queryParam: async (query) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    const result = await request.query(query);
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        });
    },

    queryParamArr: async (query, value) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    const result = await request.query(query, value);
                    console.dir(result)
                    resolve(result)
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    Transaction: async (...args) => {
        return new Promise(async (resolve, reject) =>{
            try {
                const pool = poolPromise;
                const transaction = new pool.Transaction();
                const poolConnection = pool.request(transaction);
                try {
                    await poolConnection.begin();
                    args.forEach(async (it) => await it(poolConnection));
                    await poolConnection.commit();
                    resolve(result)
                    await poolConnection.close();
                } catch (err){
                    poolConnection.rollback()
                    reject(err);
                    await poolConnection.close();
                }
            } catch (err){
                reject(err);
            }
        });
    },

    attendStart: async (userID, partyID, ip, location) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_IP', sql.VarChar(50), ip);
                    request.input('AS_LOC_NM', sql.VarChar(50), location);
                    const result = await request.execute('[dbo].[SP_ATTEND_SATRT_SAVE]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        });
    },

    attendEnd: async (userID, partyID, ip, location) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_IP_IF', sql.VarChar(50), ip);
                    request.input('AS_LOC_NM', sql.VarChar(50), location);
                    const result = await request.execute('[dbo].[SP_ATTEND_END_SAVE]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        });
    },

    createCompany: async (partyNM, regID, partyADD, partyNUMBER) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_NM', sql.NVarChar(100), partyNM);
                    request.input('AS_REG_ID', sql.VarChar(20), regID);
                    request.input('AS_PARTY_ADD', sql.NVarChar(200), partyADD);
                    request.input('AS_PARTY_NUMBER', sql.VarChar(50), partyNUMBER);
                    const result = await request.execute('[dbo].[SP_KA7000_U_2001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        });
    },

    myInfo : async (userID, partyID) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID_NM', sql.VarChar(100), userID);
                    const result = await request.execute('[dbo].[SP_KA1100_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    depInfo : async (partyID) => {
        return new Promise ( async (resolve, reject ) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('P_PARTY_ID', sql.VarChar(20), partyID);
                    const result = await request.execute('[dbo].[SP_KA1100_S_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    editInfo : async (userID, partyID, userName, userEName, userDep, userPos, userPhone, userEmail, userWork) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_USER_NM', sql.NVarChar(50), userName);
                    request.input('AS_USER_E_NM', sql.VarChar(100), userEName);
                    request.input('AS_DEPT_CD', sql.VarChar(50), userDep);
                    request.input('AS_POSITION_IF', sql.NVarChar(200), userPos);
                    request.input('AS_PHONE_IF', sql.VarChar(200), userPhone);
                    request.input('AS_EMAIL_IF', sql.VarChar(200), userEmail);
                    request.input('AS_ASSIGN_TASK_IF', sql.NVarChar(200), userWork);
                    request.input('AS_PHOTO_FILE_SEQ', sql.BigInt, null);
                    const result = await request.execute('[dbo].[SP_KA1100_U_1004]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    attendStatus : async (userID, partyID) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    const result = await request.execute('[dbo].[SP_KB2100_S_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    myAttend : async (userID, partyID, date) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_YEARMONTH', sql.VarChar(20), date);
                    const result = await request.execute('[dbo].[SP_KB2100_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    }, 

    orgAttend : async (userID, partyID, date) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_YEARMONTH', sql.VarChar(20), date);
                    const result = await request.execute('[dbo].[SP_KB2100_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    }, 

    orgComment : async (seq, userID, comment) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_DAY_WROK_SEQ', sql.BigInt, seq);
                    request.input('AS_USERID', sql.VarChar(50), userID);
                    request.input('AS_COMMENT_DAYWORK', sql.NVarChar(sql.MAX), comment);
                    const result = await request.execute('[dbo].[SP_KB3100_U_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    }, 

    orgCommentRead : async (partyID, userID, seq) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(100), partyID);
                    request.input('AS_DAY_WROK_SEQ', sql.BigInt, seq);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    const result = await request.execute('[dbo].[SP_KB3100_S_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    }, 

    signList : async (partyID, userID) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1010]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    getXList : async (partyID, userID, seq) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_MY_SLINE_SEQ', sql.Int, seq);
                    request.input('AS_USER_NM', sql.VarChar(20), null);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1006]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    makeSign : async (partyID, userID, signName) => {
        return new Promise ( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_MY_SLINE_SEQ', sql.BigInt, null);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_MY_SLINE_NM', sql.NVarChar, signName);
                    const result = await request.execute('[dbo].[SP_KB4100_U_1006]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    deleteList : async (partyID, seq, flag) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_MY_SLINE_SEQ', sql.BigInt, seq);
                    request.input('AS_DELETE_FLAG', sql.Char(1), flag);
                    const result = await request.execute('[dbo].[SP_KB4100_D_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    console.error('SQL error' , err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    putList : async (partyID, seq, userID, sort) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_MY_SLINE_SEQ', sql.BigInt, seq);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_SORT_ORD', sql.VarChar(20), sort);
                    const result = await request.execute('[dbo].[SP_KB4100_U_1005]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    signListD : async (partyID, seq) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_MY_SLINE_SEQ', sql.BigInt, seq);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1007_M]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    console.error('SQL error' , err);
                }
            } catch (err){
                reject(err);
            }
        })
    },

    journalWrite : async (partyID, userID, calDay, today, tomorrow, file) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(50), userID);
                    request.input('AS_CALDAY', sql.VarChar(50), calDay);
                    request.input('AS_TODAY', sql.NVarChar(sql.MAX), today);
                    request.input('AS_TOMORROW', sql.NVarChar(sql.MAX), tomorrow);
                    request.input('AS_FILE_SEQ', sql.BigInt, file);
                    const result = await request.execute('[dbo].[SP_KB3100_U_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    getMyJournal : async (partyID, userID, date, isOwner) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_YEARMONTHDAY', sql.VarChar(20), date);
                    request.input('AS_ISOWNER', sql.VarChar(10), isOwner);
                    const result = await request.execute('[dbo].[SP_KB3100_S_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    orgJournal : async (partyID, userID, date, isOwner) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_YEARMONTHDAY', sql.VarChar(20), date);
                    request.input('AS_ISOWNER', sql.VarChar(10), isOwner);
                    const result = await request.execute('[dbo].[SP_KB3100_S_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    approveFor : async (partyID, userID, status, where, keyword) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_STATUS', sql.VarChar(10), status);
                    request.input('AS_WHERE', sql.VarChar(10), where);
                    request.input('AS_KEYWORD', sql.VarChar(255), keyword);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    approveForDetail : async (partyID, userID, seq) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_SIGN_SEQ', sql.BigInt, seq);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1004]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    getStatus :  async (partyID, seq) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_SIGN_SEQ', sql.BigInt, seq);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    doApprove : async (partyID, seq, userID, period, idea) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_SIGN_SEQ', sql.BigInt, seq);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_HOLIDAY_PERIOD', sql.Numeric(7.2), period);
                    request.input('AS_SLINE_DC', sql.NVarChar(500), idea);
                    const result = await request.execute('[dbo].[SP_KB4100_U_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    noApprove : async (partyID, seq, userID, idea) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_SIGN_SEQ', sql.BigInt, seq);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_SLINE_DC', sql.NVarChar(500), idea);
                    const result = await request.execute('[dbo].[SP_KB4100_U_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    approveDone : async (partyID, userID, status, where, keyword) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_STATUS', sql.VarChar(10), status);
                    request.input('AS_WHERE', sql.VarChar(10), where);
                    request.input('AS_KEYWORD', sql.VarChar(255), keyword);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1002_M]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    written : async (partyID, userID, status, where, keyword) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_STATUS', sql.VarChar(10), status);
                    request.input('AS_WHERE', sql.VarChar(10), where);
                    request.input('AS_KEYWORD', sql.VarChar(255), keyword);
                    const result = await request.execute('[dbo].[SP_KB4100_S_1001_M]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    submit : async (partyID, userID, seq, rpt, s_date, e_date, title, note, file, a1_code, a1_nm, a3_code, a3_code_02) => {
        return new Promise( async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_MY_SLINE_SEQ', sql.BigInt, seq);
                    request.input('AS_RPT_DIV_CD', sql.VarChar(20), rpt);
                    request.input('AS_S_DATE_DT', sql.VarChar(8), s_date);
                    request.input('AS_E_DATE_DT', sql.VarChar(8), e_date);
                    request.input('AS_TITLE_IF', sql.NVarChar(500), title);
                    request.input('AS_NOTE_DC', sql.NVarChar(sql.MAX), note);
                    request.input('AS_FILE_SEQ', sql.BigInt, file);
                    request.input('AS_A1_R001_CD', sql.VarChar(20), a1_code);
                    request.input('AS_A1_R001_NM', sql.NVarChar(100), a1_nm);
                    request.input('AS_A3_R001_CD', sql.VarChar(20), a3_code);
                    request.input('AS_A3_R002_CD', sql.VarChar(20), a3_code_02);
                    const result = await request.execute('[dbo].[SP_KB4100_U_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err){
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    cancel : async (partyID, userID, seq) => {
        return new Promise ( async (resolve, reject) => {
            try{
            const pool = poolPromise;
            const poolConnection = await pool.connect();
                try{
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID',sql.VarChar(20),partyID);
                    request.input('AS_SIGN_SEQ',sql.BigInt, seq);
                    request.input('AS_USER_ID',sql.VarChar(100),userID);
                    const result = await request.execute('[dbo].[SP_KB4100_U_1004]');
                    resolve(result);
                    await poolConnection.close();
                }catch(err){
                    console.error('SQR error',err);
                }
            }catch(err){
                reject(err)
            }
        })
    },

    delete : async (partyID, seq) => {
        return new Promise ( async (resolve, reject) => {
            try{
            const pool = poolPromise;
            const poolConnection = await pool.connect();
                try{
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID',sql.VarChar(20),partyID);
                    request.input('AS_SIGN_SEQ',sql.BigInt, seq);
                    const result = await request.execute('[dbo].[SP_KB4100_D_1001]');
                    resolve(result);
                    await poolConnection.close();
                }catch(err){
                    console.error('SQR error',err);
                }
            }catch(err){
                reject(err)
            }
        })
    },


    scheduleList : async (partyID, calyearDt, userID) => {
        return new Promise ( async (resolve, reject) => {
            try{
            const pool = poolPromise;
            const poolConnection = await pool.connect();
                try{
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID',sql.VarChar(20),partyID);
                    request.input('AS_CALYEAR_DT',sql.VarChar(4),calyearDt);
                    request.input('AS_USER_ID',sql.VarChar(100),userID);
                    const result = await request.execute('[dbo].[SP_KB5100_S_1001_M]');
                    resolve(result);
                    await poolConnection.close();
                }catch(err){
                    console.error('SQR error',err);
                }
            }catch(err){
                reject(err)
            }
        })
    },

    scheduleUser : async (partyId, pjtId, yyyy) => {
        return new Promise ( async (resolve, reject) => {
            try{
            const pool = poolPromise;
            const poolConnection = await pool.connect();
                try{
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID',sql.VarChar(20),partyId);
                    request.input('AS_PJT_ID',sql.VarChar(20),pjtId);
                    request.input('AS_YYYY',sql.VarChar(4),yyyy);
                    const result = await request.execute('[dbo].[SP_KA5200_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                }catch(err){
                    console.error('SQR error',err);
                }
            }catch(err){
                reject(err)
            }
        })
    },

    messageReceived : async (partyID, userID, pageNum, pageSize) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_PAGE_NO', sql.Int, pageNum);
                    request.input('AS_PAGE_SIZE', sql.Int, pageSize);
                    const result = await request.execute('[dbo].[SP_KB9000_S_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);

            }
        })
    },

    getScheduleUserCount : async (pjtId, partyID) => {
        return new Promise( async (resolve,reject) => {
        try{
            const pool = poolPromise;
            const poolConnection = await pool.connect();
            try{
                const request = poolConnection.request();
                request.input('AS_PJT_ID', sql.VarChar(20),pjtId);
                request.input('AS_PARTY_ID',sql.VarChar(20),partyID)
                const result = await request.execute('[dbo].[SP_KA5000_S_1002]');
                resolve(result);
                await poolConnection.close();
            }catch(err){
                console.error('SQR error',err);
            }
        }catch(err){
            reject(err)
        }
        })
    },

    messageSended : async (partyID, userID, pageNum, pageSize) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_PAGE_NO', sql.Int, pageNum);
                    request.input('AS_PAGE_SIZE', sql.Int, pageSize);
                    const result = await request.execute('[dbo].[SP_KB9000_S_1004]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    messageUserList : async (partyID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    const result = await request.execute('[dbo].[SP_KB9100_S_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    messageWrite : async (partyID, userID, msg_div, r_userID, message, my_self) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_S_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_MSG_DIV_CD', sql.VarChar(20), msg_div);
                    request.input('AS_R_USER_ID', sql.VarChar(100), r_userID);
                    request.input('AS_S_MESSAGE_DC', sql.NVarChar(2000), message);
                    request.input('AS_MY_SELF', sql.VarChar(2000), my_self);
                    const result = await request.execute('[dbo].[SP_KB9000_U_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },


    employeeList : async (partyID, userID) => {
        return new Promise(async(resolve, reject) => {
            try{
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try{
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID',sql.VarChar(20),partyID);
                    request.input('AS_USER_ID_NM',sql.NVarChar(100),userID);
                    const result = await request.execute('[dbo].[SP_KA1100_S_1001_M]');
                    console.log(result);
                    resolve(result);
                    await poolConnection.close();
                } catch(error){
                    console.error("SQL ERROR",error);
                }
            } catch(error){
                reject(error);

            }
        })
    },

    adminStatus : async (partyID, date, attendTime) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_YEARMONTH', sql.VarChar(6), date);
                    request.input('AS_ATTEND_TIME', sql.VarChar(20), attendTime);
                    const result = await request.execute('[dbo].[SP_KA2100_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);

            }
        })
    },

    adminStatusSearch : async (partyID, date, attendTime, userNM) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                console.log(partyID);
                console.log(userNM);
                console.log("-----------------------");

                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_YEARMONTH', sql.VarChar(6), date);
                    request.input('AS_ATTEND_TIME', sql.VarChar(20), attendTime);
                    request.input('AS_USER_NM', sql.NVarChar(20), userNM);
                    const result = await request.execute('[dbo].[SP_KA2100_S_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);

            }
        })
    },


    postEmployeeUser : async ( partyID, userID, edit_name_ko, edit_name_en, DEPT_CD, rank, enter_date, phone, edit_email ) => {
        return new Promise(async(resolve, reject) => {
            try{
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try{
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VARCHAR(20), partyID);             //  소속 단체(법인) ID(FK:TB_PARTY.PARTY_ID)
                    request.input('AS_USER_ID', sql.VARCHAR(100), userID);              //  사원 ID
                    request.input('AS_USER_NM', sql.NVARCHAR(50), edit_name_ko);         //  사원이름
                    request.input('AS_USER_E_NM', sql.VARCHAR(100), edit_name_en);      //  영문이름
                    request.input('AS_DEPT_CD', sql.VARCHAR(50), DEPT_CD);              //  소속 부서

                    request.input('AS_POSITION_IF', sql.NVARCHAR(200), rank);            //  현 직급 정보
                    request.input('AS_PHONE_IF', sql.VARCHAR(200), phone);              //  연락처 정보
                    request.input('AS_EMAIL_IF', sql.VARCHAR(200), edit_email);         //  ORG 이메일 정보
                    request.input('AS_ASSIGN_TASK_IF', sql.NVARCHAR(200),null);          //  담당업무 정보
                    request.input('AS_PHOTO_FILE_SEQ', sql.BigInt, null);               //  사진 파일 SEQ

                    request.input('AS_ENTER_COM_DT', sql.VARCHAR(8), enter_date);               //  입사일
                    
                    const result = await request.execute('[dbo].[SP_KA1100_U_1004_M]');
                    console.log("-------------------",result,"------------------");
                    resolve(result);
                    await poolConnection.close();
                } catch(error){
                    console.error("SQL ERROR",error);
                }
            } catch(error){
                reject(error);
            }
        })
    },

    adminTask : async (partyID, date) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_YEARMONTH', sql.VarChar(50), date);
                    const result = await request.execute('[dbo].[SP_KA3100_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);

            }
        })
    },

    adminTaskSearch : async (partyID, date, userNM) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_YEARMONTH', sql.VarChar(50), date);
                    request.input('AS_USER_NM',sql.NVarChar(50),userNM)
                    const result = await request.execute('[dbo].[SP_KA3100_S_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);

            }
        })
    },

    taskComment : async (partyID, date) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_YEARMONTH', sql.VarChar(50), date);
                    const result = await request.execute('[dbo].[SP_KA3100_S_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);

            }
        })
    },

    putEmployeeUserEdit : async ( partyID , userID, edit_name_ko, edit_name_en, DEPT_CD, rank, phone, edit_email, AS_ASSIGN_TASK_IF, AS_NOTE_DC, AS_IS_ADMIN, AS_PHOTO_FILE_SEQ, AS_MYPARTYLEV, enter_date, AS_BIRTHDAY_DT, AS_PHONE1_NUM, AS_EMAIL2_IF, AS_POST_NO, AS_JUSO1_IF, AS_JUSO2_IF, AS_ANIV1_NM, AS_ANIV2_NM, AS_ANIV1_DT, AS_ANIV2_DT, exit_date) => {
        return new Promise(async(resolve, reject) => {
            try{
                const pool = poolPromise;
                const poolConnection = await pool.connect();

                try{

                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VARCHAR(20), partyID);             //  소속 단체(법인) ID(FK:TB_PARTY.PARTY_ID)
                    request.input('AS_USER_ID', sql.VARCHAR(100), userID);              //  사원 ID
                    request.input('AS_USER_NM', sql.NVARCHAR(50), edit_name_ko);         //  사원이름
                    request.input('AS_USER_E_NM', sql.VARCHAR(100), edit_name_en);      //  영문이름
                    request.input('AS_DEPT_CD', sql.NVARCHAR(50), DEPT_CD);              //  소속 부서

                    request.input('AS_POSITION_IF', sql.NVARCHAR(200), rank);            //  현 직급 정보
                    request.input('AS_PHONE_IF', sql.VARCHAR(200), phone);              //  연락처 정보
                    request.input('AS_EMAIL_IF', sql.VARCHAR(200), edit_email);         //  ORG 이메일 정보
                    request.input('AS_ASSIGN_TASK_IF', sql.NVARCHAR(200),AS_ASSIGN_TASK_IF);          //  담당업무 정보
                    request.input("AS_NOTE_DC", sql.VARCHAR(200), AS_NOTE_DC);                //  비고
 
                    request.input("AS_IS_ADMIN", sql.VARCHAR(1), AS_IS_ADMIN);                 //  관리자 여부
                    request.input('AS_PHOTO_FILE_SEQ', sql.BigInt, AS_PHOTO_FILE_SEQ);               //  사진 파일 SEQ
                    request.input("AS_MYPARTYLEV", sql.INT, AS_MYPARTYLEV);                      //  사원레벨


                    request.input("AS_CARD_000_SEQ", sql.BIGINT, "");                 //  인사카드 SEQ
                    request.input('AS_ENTER_COM_DT', sql.VARCHAR(8), enter_date);       //  입사일자
                    request.input("AS_BIRTHDAY_DT", sql.VARCHAR(8), AS_BIRTHDAY_DT);              //  생일
                    request.input("AS_PHONE1_NUM", sql.VARCHAR(20), AS_PHONE1_NUM);              //  추가연락처
                    request.input("AS_EMAIL2_IF", sql.VARCHAR(200), AS_EMAIL2_IF);              //  개인 이메일 정보

                    request.input("AS_POST_NO", sql.VARCHAR(20), AS_POST_NO);                 //  우편번호
                    request.input("AS_JUSO1_IF", sql.NVARCHAR(500), AS_JUSO1_IF);               //  주소
                    request.input("AS_JUSO2_IF", sql.NVARCHAR(500), AS_JUSO2_IF);               //  상세주소
                    request.input("AS_ANIV1_NM", sql.NVARCHAR(50), AS_ANIV1_NM);                //  기념일 1 명칭
                    request.input("AS_ANIV2_NM", sql.NVARCHAR(50), AS_ANIV2_NM);                //  기념일 2 명칭

                    request.input("AS_ANIV1_DT", sql.VARCHAR(8), AS_ANIV1_DT);                 //  기념일 1
                    request.input("AS_ANIV2_DT", sql.VARCHAR(8), AS_ANIV2_DT);                 //  기념일 2
                    
                    if(exit_date === ""){
                        request.input("AS_OUT_COM_YN", sql.VARCHAR(1), "N");               //  퇴직 여부
                        request.input('AS_OUT_COM_DT', sql.VARCHAR(8), null);          //  퇴직 날짜
                    } else {
                        request.input("AS_OUT_COM_YN", sql.VARCHAR(1), "Y");               //  퇴직 여부
                        request.input('AS_OUT_COM_DT', sql.VARCHAR(8), exit_date);          //  퇴직 날짜
                    }

                    const result = await request.execute('[dbo].[SP_KA1100_U_1001]');

                    resolve(result);

                    await poolConnection.close();
                } catch(error){
                    console.error("SQL ERROR",error);
                }
            } catch(error){
                reject(error);
            }
        })
    },

    projectList : async (partyID, year) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_CALYEAR_DT', sql.VarChar(4), year);
                    const result = await request.execute('[dbo].[SP_KA5000_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    projectEdit : async (partyID, pjt_id, pjt_nm, pjt_f_nm, pjt_s_dt, pjt_e_dt, pjt_customer, pjt_manager, mm, note) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_PJT_ID', sql.VarChar(20), pjt_id);
                    request.input('AS_PJT_NM', sql.NVarChar(200), pjt_nm);
                    request.input('AS_PJT_F_NM', sql.NVarChar(200), pjt_f_nm);
                    request.input('AS_PJT_STAT_CD', sql.VarChar(20), '');
                    request.input('AS_PJT_S_DT', sql.VarChar(8), pjt_s_dt);
                    request.input('AS_PJT_E_DT', sql.VarChar(8), pjt_e_dt);
                    request.input('AS_CHARGER1_NM', sql.NVarChar(50), pjt_customer);
                    request.input('AS_CHARGER2_NM', sql.VarChar(50), '');
                    request.input('AS_CHARGER3_NM', sql.NVarChar(50), pjt_manager);
                    request.input('AS_BG_COLOR_IF', sql.VarChar(20), '#0d47a1');
                    request.input('AS_MM_NUM', sql.VarChar(18, 2), mm);
                    request.input('AS_ESTMT_AMT', sql.VarChar(18, 0), null);
                    request.input('AS_WORK_S_TIME', sql.VarChar(4), '');
                    request.input('AS_ORDER_COM_NM', sql.VarChar(200), '');
                    request.input('AS_PLACE_IF', sql.VarChar(200), '');
                    request.input('AS_NOTE_DC', sql.NVarChar(500), note);
                    const result = await request.execute('[dbo].[SP_KA5000_U_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    projectDelete : async (partyID, pjt_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_PJT_ID', sql.VarChar(20), pjt_id);
                    const result = await request.execute('[dbo].[SP_KA5100_D_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    annualList : async (partyID, year) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_CALYEAR_DT', sql.VarChar(20), year);
                    const result = await request.execute('[dbo].[SP_KA8200_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    annualEdit : async (partyID, year, userID, editID, basic, add, use) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_YEAR_DT', sql.VarChar(20), year);
                    request.input('AS_USER_ID', sql.VarChar(100), userID);
                    request.input('AS_REGID', sql.VarChar(20), editID);
                    request.input('AS_BASE_DAY_NUM', sql.VarChar(20), basic);
                    request.input('AS_ADD_DAY_NUM', sql.VarChar(20), add);
                    request.input('AS_USE_DAY_NUM', sql.VarChar(20), use);
                    const result = await request.execute('[dbo].[SP_KA8200_U_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    getNotice : async (partyID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_IS_ADMIN', sql.VarChar(1), 'N');
                    request.input('AS_WHERE', sql.VarChar(10), 'ALL');
                    request.input('AS_KEYWORD', sql.VarChar(255), '%');
                    request.input('AS_BBS_CD', sql.VarChar(10), 'notify');
                    const result = await request.execute('[dbo].[SP_KB8100_S_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    putEmployeeUserPermitY : async (partyID, applyID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), applyID);
                    const result = await request.execute('[dbo].[SP_KA1100_U_1003]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    putEmployeeUserResetPassword : async (partyID, applyID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), applyID);
                    console.log("delete succes");
                    const result = await request.execute('[dbo].[SP_KA1100_U_1002]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    deleteEmployeeUserPermit : async (partyID, applyID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID', sql.VarChar(100), applyID);
                    console.log("delete succes");
                    const result = await request.execute('[dbo].[SP_KA1100_D_1001]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    getOrgList : async (partyID, userID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_PARTY_ID', sql.VarChar(20), partyID);
                    request.input('AS_USER_ID_NM', sql.VarChar(100), userID);
                    const result = await request.execute('[dbo].[SP_KA1100_S_1001_M]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

    getFileList : async (fileSeq) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = poolPromise;
                const poolConnection = await pool.connect();
                try {
                    const request = poolConnection.request();
                    request.input('AS_FILE_SEQ', sql.BigInt, fileSeq);
                    const result = await request.execute('[dbo].[SP_FILE_LIST]');
                    resolve(result);
                    await poolConnection.close();
                } catch (err) {
                    reject(err);
                }
            } catch (err) {
                reject(err);
            }
        })
    },

}

