/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var Skills = require('../../models/Skills');

/* GET /skills listing. */
router.get('/', function(req, res, next) {
  Skills.all.find({},function (err, todos) {
      if (err) return next(err);
      res.json(todos);
  });
});

/* GET /skills listing. */
router.get('/:id', function(req, res, next) {
  Skills.all.findOne({_id:req.params.id},function (err, todos) {
      if (err) return next(err);
      res.json(todos);
  });
});

/* POST /skills */
router.post('/',/* authController.isAuthenticated,*/ function(req, res, next) {
  Skills.all.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* PUT /skills/:id */
router.put('/:id', function(req,res,next){
  Skills.all.update({_id: req.params.id},req.body,function(err,post){
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /skills/:id */
router.delete('/:id',/* authController.isAuthenticated, */ function(req, res, next) {
  Skills.all.remove({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
