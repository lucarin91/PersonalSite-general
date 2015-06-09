var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Me = require('../../models/Me.js');

/* GET /me listing. */
router.get('/', function(req, res, next) {
  Me.aggregate({
   $project : {
       bio : "$bio."+req.lang,
       img: 1
   }},// );
  /*Me.findOne({}, { "bio.ita": 0 },*/ function (err, todos) {
    if (err) return next(err);
    res.json(todos[0]);
  });
});

/* POST /me */
/*
router.post('/', authController.isAuthenticated, function(req, res, next) {
  req.body.user=req.user._id;
  Me.update({user:req.user._id}, req.body, {upsert:true}, function (err, post) {
    if (err)return next(err);
    res.json(post);
  });
});

router.delete('/', authController.isAuthenticated, function(req, res, next) {
  Me.remove({user:req.user._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

module.exports = router;
