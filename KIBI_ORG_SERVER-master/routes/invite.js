var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
const mailConfig = require('../config/mailconfig');
const middleware = require('../modules/middlewares');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');

/* GET users listing. */
router.post('/', middleware.userJwt, middleware.partyID, function(req, res) {
    const partyID = req.partyid;
    const partyNM = req.body.company;
    const sentName = req.body.sentName;
    const sentEmail = req.userID;
    const receivedEmail = req.body.receivedEmail;
    const time = req.body.time;
    
    const route = path.join(__dirname, '..', 'views') + '\\mail.ejs';
    var doc = fs.readFileSync(route, 'utf8');
    const emailBody = ejs.render(doc, {name : sentName, email : receivedEmail, company : partyNM, time : time, url : "http://192.168.0.14:7070/member/mailJoin.do?partyId="+partyID});

    const info = async () => {
            console.log('mail trans');

            var transporter = nodemailer.createTransport({
                service: mailConfig.mailservice,
                auth: {
                    user : mailConfig.mailid,
                    pass : mailConfig.mailpassword
                }
            });

            var sendmailaddress = sentEmail;
            var tomailaddress = receivedEmail;
            var mailsubject = "KIBI@ORG에서 당신을 초대합니다";
            var mailbody = emailBody;

            var mailOptions = {
                from: sendmailaddress,
                to: tomailaddress,
                subject: mailsubject,
                html: mailbody
            };

            var send = await transporter.sendMail(mailOptions);
            console.log("Message sent : %s", send.messageId);
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_TRANS_INVITATION, send.messageId));
        }

    info().catch(console.error);
})

module.exports = router;
