/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Projects = require('../../models/Projects.js');

/* GET /projects listing. */
router.get('/', function(req, res, next) {
  Projects.all.find({}, function(err,data){
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:id', function(req, res, next) {
  Projects.all.findOne({_id:req.params.id}, function(err,data){
    if (err) return next(err);
    res.json(data);
  });
});

/* POST /projects */
router.post('/',/* authController.isAuthenticated,*/ function(req, res, next) {
  Projects.all.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* PUT /projects/:id */
router.put('/:id', function(req,res,next){
  Projects.all.update({_id: req.params.id},req.body,function(err,post){
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /projects/:id */
router.delete('/:id',/* authController.isAuthenticated, */ function(req, res, next) {
  Projects.all.remove({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
