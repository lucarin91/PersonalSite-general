/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Curriculum = require('../../models/Curriculum.js');

/* GET /curriculum */
router.get('/', function(req, res, next) {
  Curriculum.aggregate({
   $project : {
       name : "$name."+req.lang,
       info : "$info."+req.lang,
       date: 1
   }}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
  /*Curriculum.find({}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });*/
});

/* POST /curriculum */
router.post('/', /*authController.isAuthenticated,*/ function(req, res, next) {
  var data = {name:{},info:{},date:req.body.date};
  data.name[req.lang] = req.body.name;
  data.info[req.lang] = req.body.info;
  console.log(req.body);
  Curriculum.create(data, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* DELETE /curriculum/:id */
router.delete('/:id', /*authController.isAuthenticated,*/ function(req, res, next) {
  Curriculum.remove({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /curriculum/:id */
router.put('/:id', function(req, res, next) {
  var query = {$set:{}};
  if (req.body.info)
    query.$set["info."+req.lang] = req.body.info;
  if (req.body.name)
    query.$set["name."+req.lang] = req.body.name;
  if (req.body.date)
    query.$set.date = req.body.date;
  console.log(query);
  Curriculum.update({_id:req.params.id}, query, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
