var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Projects = require('../../models/Projects.js');

/* GET /projects listing. */
router.get('/', function(req, res, next) {
  Projects.aggregate({
   $project : {
       name : "$name."+req.lang,
       "items.name" : "$items.name."+req.lang,
       "items.info" : "$items.info."+req.lang
   }}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /projects */
router.post('/',/* authController.isAuthenticated,*/ function(req, res, next) {
  req.body.user = req.user._id;
  Projects.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /projects/:id */
router.post('/:name',/* authController.isAuthenticated,*/ function(req, res, next) {
  if (req.body.name===undefined) next({message:'need name field'});
  Projects.update({name:req.params.name},{$addToSet: {items: req.body}},{safe: true}, function(err,num,data){
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE /projects */
router.delete('/',/* authController.isAuthenticated, */ function(req, res, next) {
  Projects.remove({user:req.user._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
