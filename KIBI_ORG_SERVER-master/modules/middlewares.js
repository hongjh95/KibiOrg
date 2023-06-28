const util = require('./util');
const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const UserModel = require('../models/user');
const jwt = require('./jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    userJwt: async (req, res, next) => {
        const token = req.headers.token;
        console.log("토큰 21.10.16 >>> 1 : " + token);
        if (!token) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        }
        
        const user = await jwt.verify(token);
        if (user === TOKEN_EXPIRED) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }

        if (user === TOKEN_INVALID) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }

        if (user === undefined) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }

        req.userID = user["id"];
        next();
    },

    // refreshToken 검증
    refreshToken : async (req, res) => {
        const refreshToken = req.headers.refreshtoken;

        if (!refreshToken) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        }

        const newToken = await jwt.refresh(refreshToken);

        if (newToken == TOKEN_EXPIRED) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }

        if (newToken == TOKEN_INVALID) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_TOKEN_REPLACEMENT, newToken));
    },

    partyID : async ( req, res, next ) => {
        const partyID = req.headers.partyid;
        console.log(partyID)
        if(!partyID){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_PARTYID));
        }

        req.partyid = partyID;
        next();
        console.log("Next() 타는지 확인 >>> ")
    },

    dateTime : async ( req, res, next ) => {
        const date = req.headers.date;
        if(!date){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_DATE));
        }

        req.date = date;
        next();
    }
}