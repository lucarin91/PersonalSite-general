/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var Skills = require('../../models/Skills');

/* GET /skills listing. */
router.get('/', function(req, res, next) {
  Skills.item.find({},function (err, todos) {
      if (err) return next(err);
      res.json(todos);
  });
});

/* GET /skills listing. */
router.get('/:id', function(req, res, next) {
  Skills.item.findOne({_id:req.params.id},function (err, todos) {
      if (err) return next(err);
      res.json(todos);
  });
});

/* POST /skills */
router.post('/',/* authController.isAuthenticated,*/ function(req, res, next) {
  if (req.body.point<0 || req.body.point>3) return next(new Error("point range 0-3"));
  Skills.item.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* PUT /skills/:id */
router.put('/:id', function(req,res,next){
  if (req.body.point<0 || req.body.point>3) return next(new Error("point range 0-3"));
  Skills.item.update({_id: req.params.id},req.body,function(err,post){
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /skills/:id */
router.delete('/:id',/* authController.isAuthenticated, */ function(req, res, next) {
  Skills.item.remove({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /skills/item/:id_items *//*
router.put('/item/:idi', function(req,res,next){
  if (req.body.point<0 || req.body.point>3) next(new Error("point range 0-3"));
  Skills.item.update({_id: req.params.idi},req.body,function(err,post){
    if (err) return next(err);
    res.json(post);
  });
});



/* DELETE /skills/:id_projects/:id_item *//*
router.delete('/item/:idi',/* authController.isAuthenticated, *//* function(req, res, next) {
  Skills.item.remove({_id:req.params.idi}, function (err, post) {
    if (err) return next(err);
    Skills.all.update({items: req.params.idi},{$pull: {items: req.params.idi}}, function(err,post){
      res.json(post);
    });
  });
});
*/
module.exports = router;
