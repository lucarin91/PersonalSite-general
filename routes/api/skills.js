var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
var mongoose = require('mongoose');
var Skills = require('../models/Skills.js');

/* GET /skills listing. */
router.get('/', function(req, res, next) {
  Skills.find({user:req.userId}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /skills */
router.post('/', authController.isAuthenticated, function(req, res, next) {
  req.body.user = req.user._id;
  Skills.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /skills/:name */
router.post('/:name', authController.isAuthenticated, function(req, res, next) {
  if (req.body.name) next({message:'no name found'});
  req.body.user = req.user._id;
  Skills.update({
                  _id:req.user.id,
                  name:req.params.name,
                  'items.name': { $ne: req.body.name }
                },{
                  $addToSet: {items: req.body}
                },
                function (err, post) {
                  if (err) return next(err);
                  res.json(post);
                });
});

/* POST /skills/:name */
router.put('/:name', authController.isAuthenticated, function(req, res, next) {
  if (req.body.name) next({message:'no name found'});
  req.body.user = req.user._id;
  Skills.update({
                  _id:req.user.id,
                  name:req.params.name,
                  'items.name': req.body.name
                },{
                  $set: {'items.$': req.body}
                },
                function (err, post) {
                  if (err) return next(err);
                  res.json(post);
                });
});

/* DELETE /skills */
router.delete('/', authController.isAuthenticated, function(req, res, next) {
  Skills.remove({user:req.user._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
