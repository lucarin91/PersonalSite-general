var express = require('express');
var router = express.Router();
var Skills = require('../../models/Skills.js');

/* GET /skills listing. */
router.get('/', function(req, res, next) {
  Skills.all.find({}).populate({path:'items'}) // only works if we pushed refs to children
    .exec(function (err, todos) {
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

/* POST /skills/:id */
router.post('/:id',/* authController.isAuthenticated,*/ function(req, res, next) {
  if (req.body.point<0 || req.body.point>3) next(new Error("point range 0-3"));
  Skills.item.create(req.body, function(err,post){
    Skills.all.update({_id:req.params.id},{$addToSet: {items: post._id}},{safe: true}, function(err,num,data){
      if (err) return next(err);
      res.json(post._id);
    });
  });
  /*Skills.update({_id:req.params.id},{$addToSet: {items: data}},{safe: true}, function(err,num,data){
    if (err) return next(err);
    var pictureIds = _.map(data, '_id');
    res.json(pictureIds);
  });*/
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

/* PUT /skills/item/:id_items */
router.put('/item/:idi', function(req,res,next){
  if (req.body.point<0 || req.body.point>3) next(new Error("point range 0-3"));
  Skills.item.update({_id: req.params.idi},req.body,function(err,post){
    if (err) return next(err);
    res.json(post);
  });
});



/* DELETE /skills/:id_projects/:id_item */
router.delete('/item/:idi',/* authController.isAuthenticated, */ function(req, res, next) {
  Skills.item.remove({_id:req.params.idi}, function (err, post) {
    if (err) return next(err);
    Skills.all.update({items: req.params.idi},{$pull: {items: req.params.idi}}, function(err,post){
      res.json(post);
    });
  });
});

module.exports = router;
