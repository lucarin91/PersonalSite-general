var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
var mongoose = require('mongoose');
var Curriculum = require('../models/Curriculum.js');

/* GET /curriculum */
router.get('/', function(req, res, next) {
  Curriculum.find({user:req.userId}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /curriculum */
router.post('/', authController.isAuthenticated, function(req, res, next) {
  req.body.user = req.user._id;
  Curriculum.update({user: req.user._id}, req.body, {upsert:true}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /curriculum */
router.delete('/', authController.isAuthenticated, function(req, res, next) {
  Curriculum.remove({user:req.user._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/*
PUT /users/:id
router.put('/:id', function(req, res, next) {
  Curriculum.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /users/:id
router.delete('/:id', function(req, res, next) {
  Curriculum.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

module.exports = router;
