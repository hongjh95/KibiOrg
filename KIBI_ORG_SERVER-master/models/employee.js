const pool = require('../modules/pool');

const employee = {
    employeeList : async (partyID, userID) => {
        try {
            const result = await pool.employeeList(partyID, userID);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    },

    postEmployeeUser : async ( partyID, userID, edit_name_ko, edit_name_en, DEPT_CD, rank, enter_date, phone, edit_email ) => {
        try {
            const result = await pool.postEmployeeUser( partyID, userID, edit_name_ko, edit_name_en, DEPT_CD, rank, enter_date, phone, edit_email );
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    },

    putEmployeeUserEdit : async ( partyID, userID, edit_name_ko, edit_name_en, DEPT_CD, rank, phone, edit_email, AS_ASSIGN_TASK_IF, AS_NOTE_DC, AS_IS_ADMIN, AS_PHOTO_FILE_SEQ, AS_MYPARTYLEV, enter_date, AS_BIRTHDAY_DT, AS_PHONE1_NUM, AS_EMAIL2_IF, AS_POST_NO, AS_JUSO1_IF, AS_JUSO2_IF, AS_ANIV1_NM, AS_ANIV2_NM, AS_ANIV1_DT, AS_ANIV2_DT, exit_date) => {
        try {
            const result = await pool.putEmployeeUserEdit( partyID, userID, edit_name_ko, edit_name_en, DEPT_CD, rank, phone, edit_email, AS_ASSIGN_TASK_IF, AS_NOTE_DC, AS_IS_ADMIN, AS_PHOTO_FILE_SEQ, AS_MYPARTYLEV, enter_date, AS_BIRTHDAY_DT, AS_PHONE1_NUM, AS_EMAIL2_IF, AS_POST_NO, AS_JUSO1_IF, AS_JUSO2_IF, AS_ANIV1_NM, AS_ANIV2_NM, AS_ANIV1_DT, AS_ANIV2_DT, exit_date);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    },

    putEmployeeUserResetPassword : async (partyID, applyID) => {
        try {
            const result = await pool.putEmployeeUserResetPassword(partyID, applyID);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    },

    putEmployeeUserPermitY : async (partyID, applyID) => {
        try {
            const result = await pool.putEmployeeUserPermitY(partyID, applyID);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    },

    deleteEmployeeUserPermit: async (partyID, applyID) => {
        try {
            const result = await pool.deleteEmployeeUserPermit(partyID, applyID);
            return result;
        }catch(err){
            console.log('Error : ', err);
            throw err;
        }
    }

    
}

module.exports = employee;