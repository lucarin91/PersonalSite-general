/* jshint node: true, esversion: 6 */
"use strict";

var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'user',
        pass: 'password'
    }
});


/* GET /me listing. */
router.post('/', (req, res, next) => {
  console.log('sendmail', req.body.body, req.body.email);
  transporter.sendMail({
    from: 'no-reply@example.com',
    to: 'test@test',
    subject: 'mail from lucarin',
    text: `From: ${req.body.email}\nBody: ${req.body.body}`
  }, (err)=>{
    if (err)
      res.send(err);
    else
      res.send('ok');
  });
});

module.exports = router;
