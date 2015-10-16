/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
var Projects = require('../../models/Projects.js');

/* GET /projects listing. */
router.get('/', function(req, res, next) {
  /*Projects.all.aggregate({
   $project : {
       name: "$name."+req.lang,
       "items.name": 1,
       "items.info": 1,
       "items.link": 1,
       "items._id": 1
   }}, function (err, todos) {
    if (err) return next(err);
    //provvisorio capire come farlo fare a mongoDB
    for (var i=0;i<todos.length;i++){
      var items = todos[i].items;
      for (var j=0;j<items.length;j++){
        if (items[j].name)
          items[j].name = items[j].name[req.lang];
        if (items[j].info)
          items[j].info = items[j].info[req.lang];
      }
    }
    res.json(todos);
  });*/
  Projects.item.find({}, function(err,data){
    if (err) return next(err);
    res.json(data);
  });
  /*Projects.all.get(req.lang, function(err,data){
    if (err) return next(err);
    res.json(data);
  });*/
});

router.get('/:id', function(req, res, next) {
  Projects.item.findOne({_id:req.params.id}, function(err,data){
    if (err) return next(err);
    res.json(data);
  });
});

/* POST /projects */
router.post('/',/* authController.isAuthenticated,*/ function(req, res, next) {
  /*if (!req.body.name) next(new Error('require name'));
  var data = {name: {} };
  data.name[req.lang]=req.body.name;
  */
  Projects.item.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* POST /projects/:id */
router.post('/:id',/* authController.isAuthenticated,*/ function(req, res, next) {
  if (!req.body.name) next(new Error('require name'));
  /*var data = {name: {}, info: {}, link: req.body.link};
  data.name[req.lang] = req.body.name;
  data.info[req.lang] = req.body.info;
  console.log(data);*/
  Projects.item.create(req.body, function(err,post){
    /*Projects.all.update({_id:req.params.id},{$addToSet: {items: post._id}},{safe: true}, function(err,num,data){
      */
    if (err) return next(err);
    res.json(post._id);
    /*});*/
  });
  /*Projects.update({_id:req.params.id},{$addToSet: {items: data}},{safe: true}, function(err,num,data){
    if (err) return next(err);
    var pictureIds = _.map(data, '_id');
    res.json(pictureIds);
  });*/
});

/* PUT /projects/:id */
router.put('/:id', function(req,res,next){
  /*var query = {$set:{}};
  if (req.body.name)
    query.$set["name."+req.lang] = req.body.name;
    */
  Projects.item.update({_id: req.params.id},req.body,function(err,post){
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /projects/:id */
router.delete('/:id',/* authController.isAuthenticated, */ function(req, res, next) {
  Projects.item.remove({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /projects/:id_projects/:id_items
router.put('/item/:idi', function(req,res,next){
  var query = {$set:{}};
  if (req.body.info)
    query.$set["info."+req.lang] = req.body.info;
  if (req.body.name)
    query.$set["name."+req.lang] = req.body.name;
  if (req.body.link)
    query.$set.link = req.body.link;
  Projects.item.update({_id: req.params.idi},query,function(err,post){
    if (err) return next(err);
    res.json(post);
  });
});



/* DELETE /projects/:id_projects/:id_item *//*
router.delete('/item/:idi',/* authController.isAuthenticated, *//* function(req, res, next) {
  Projects.item.remove({_id:req.params.idi}, function (err, post) {
    if (err) return next(err);
    Projects.all.update({items: req.params.idi},{$pull: {items: req.params.idi}}, function(err,post){
      res.json(post);
    });
  });
});
*/

module.exports = router;
