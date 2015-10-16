/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Me = require('../../models/Me.js');

/* GET /me listing. */
router.get('/', function(req, res, next) {
  Me.findOne({}).select({
    email: 0,
    address: 0,
    telephone: 0
  }).exec(function(err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /me */
router.put('/', /*authController.isAuthenticated,*/ function(req, res, next) {
  //req.body.user=req.user._id;
  /*var query = req.lang=='ita' ? {$set: {"bio.ita": req.body.bio}}:
                                {$set: {"bio.eng": req.body.bio}};
  if (req.body.img) query.$set.img = req.body.img;*/
  Me.update({}, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*
router.delete('/', authController.isAuthenticated, function(req, res, next) {
  Me.remove({user:req.user._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

module.exports = router;
