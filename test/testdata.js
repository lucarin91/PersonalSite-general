var test={
  me: function(){
    var Me = require('../models/Me.js');
    Me.remove({},function(err){
        if(!err) console.log('ok!');
    });
    Me.create({
      bio:  {
        eng: "I'm Luca",
        ita: "Sono Luca"
      },
      img:  "/img/luca.jpg"
    }, function(err,data){
      if(!err) console.log(data._id);
    });
  },
  curriculum: function(){
    var Curriculum = require('../models/Curriculum.js');
    Curriculum.remove({},function(err){
        if(!err) console.log('ok!');
    });
    Curriculum.create({
        date: new Date('07/12/2015'),
        name: {
          eng: 'things',
          ita: 'roba'
        },
        info: {
          eng: 'thinks of thinks',
          ita: 'info di roba'
        }
    }, function(err,data){
      if(!err) console.log(data._id);
    });
  },
  projects: function(){
    var Projects = require('../models/Projects');
    Projects.remove({},function(err){
        if(!err) console.log('ok!');
    });
    Projects.create({
      name: {
        eng: "projects1",
        ita: "progetti1"
      },
      items:
        [{
            name: {
              eng: "first project",
              ita: "primo progetto"
            },
            info: {
              eng: "info of first project",
              ita: "informazioni primo progetto"
            },
            link: "link"
        }]
    }, function(err,data){
      if(!err) console.log(data._id);
    });
  }
};


module.exports = test;
