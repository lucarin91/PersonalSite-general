/* jslint node: true */
"use strict";

var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/', function(req, res) {
    var pass = req.app.get('password');
    console.log(pass);

    if (pass != req.body.password) {
        res.json({
            ok: 0,
            msg: 'Authentication failed. Wrong password.'
        });
    } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({name: 'admin'}, req.app.get('private_key'), {
            expiresIn: 60*24 // 24 hours
        });

        // return the information including token as JSON
        res.json({
            ok: 1,
            token: token
        });
    }

});

module.exports = router;
