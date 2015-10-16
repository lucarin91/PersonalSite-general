/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Education = require('../../models/Education');

/* GET /curriculum */
router.get('/', function(req, res, next) {
  Education.find({}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
  /*Education.find({}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });*/
});

router.get('/:id', function(req, res, next) {
  Education.findOne({_id:req.params.id}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
  /*Education.find({}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });*/
});

/* POST /curriculum */
router.post('/', /*authController.isAuthenticated,*/ function(req, res, next) {
  /*var data = {shool:{},degree:{},score:{},location:req.body.location,date:req.body.date};
  data.school[req.lang] = req.body.school;
  data.degree[req.lang] = req.body.degree;
  data.score[req.lang] = req.body.score;
  console.log(req.body);*/
  Education.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* DELETE /curriculum/:id */
router.delete('/:id', /*authController.isAuthenticated,*/ function(req, res, next) {
  Education.remove({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /curriculum/:id */
router.put('/:id', function(req, res, next) {
  /*var query = {$set:{}};
  if (req.body.shcool)
    query.$set["shcool."+req.lang] = req.body.shcool;
  if (req.body.degree)
    query.$set["degree."+req.lang] = req.body.degree;
  if (req.body.score)
      query.$set["score."+req.lang] = req.body.score;
  if (req.body.date && (req.body.date.begin||req.body.date.end)) query.$set.date = req.body.date;
  console.log(query);*/
  Education.update({_id:req.params.id}, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
