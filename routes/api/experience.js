/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Experience = require('../../models/Experience');

/* GET /experience */
router.get('/', function(req, res, next) {
  Experience.find({}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* GET /experience */
router.get('/:id', function(req, res, next) {
  Experience.findOne({_id:req.params.id}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /experience */
router.post('/', /*authController.isAuthenticated,*/ function(req, res, next) {
  /*var data = {company: req.body.company,
              role: {},
              info: {},
              date: req.body.date,
              location: req.body.location,
              link: req.body.link};
  data.role[req.lang] = req.body.role;
  data.info[req.lang] = req.body.info;
  console.log(req.body);*/
  Experience.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* DELETE /experience/:id */
router.delete('/:id', /*authController.isAuthenticated,*/ function(req, res, next) {
  Experience.remove({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /experience/:id */
router.put('/:id', function(req, res, next) {
  /*var query = {$set:{}};
  if (req.body.company)  query.$set.company = req.body.company;
  if (req.body.info)     query.$set["info."+req.lang] = req.body.info;
  if (req.body.role)     query.$set["role."+req.lang] = req.body.role;
  if (req.body.location) query.$set.location = req.body.location;
  if (req.body.link)     query.$set.link = req.body.link;
  if (req.body.date &&
     (req.body.date.begin || req.body.date.end)) query.$set.date = req.body.date;
  console.log(query);*/
  Experience.update({_id:req.params.id}, query, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
