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
  Projects.all.find({}).populate({path:'items'}) // only works if we pushed refs to children
    .exec(function (err, todos) {
        if (err) return next(err);
        //provvisorio capire come farlo fare a mongoDB
        for (var i=0;i<todos.length;i++){
          todos[i].name = todos[i].name[req.lang]
          var items = todos[i].items;
          for (var j=0;j<items.length;j++){
            if (items[j].name)
              items[j].name = items[j].name[req.lang];
            if (items[j].info)
              items[j].info = items[j].info[req.lang];
          }
        }
        res.json(todos);
  });
});

/* POST /projects */
router.post('/',/* authController.isAuthenticated,*/ function(req, res, next) {
  if (!req.body.name) next(new Error('require name'));
  var data = {name: {} };
  data.name[req.lang]=req.body.name;
  Projects.all.create(data, function (err, post) {
    if (err) return next(err);
    res.json(post._id);
  });
});

/* POST /projects/:id */
router.post('/:id',/* authController.isAuthenticated,*/ function(req, res, next) {
  if (!req.body.name) next(new Error('require name'));
  var data = {name: {}, info: {}, link: req.body.link};
  data.name[req.lang] = req.body.name;
  data.info[req.lang] = req.body.info;
  console.log(data);
  Projects.item.create(data, function(err,post){
    Projects.all.update({_id:req.params.id},{$addToSet: {items: post._id}},{safe: true}, function(err,num,data){
      if (err) return next(err);
      res.json(post._id);
    });
  });
  /*Projects.update({_id:req.params.id},{$addToSet: {items: data}},{safe: true}, function(err,num,data){
    if (err) return next(err);
    var pictureIds = _.map(data, '_id');
    res.json(pictureIds);
  });*/
});

/* DELETE /projects */
router.delete('/',/* authController.isAuthenticated, */ function(req, res, next) {
  Projects.remove({user:req.user._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
