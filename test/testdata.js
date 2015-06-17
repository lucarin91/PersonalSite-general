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
  experience: function(){
    var Experience = require('../models/Experience');
    Experience.remove({},function(err){
        if(!err) console.log('ok!');
    });
    Experience.create({
        date: {begin:new Date('07/12/2014'),end:new Date('13/12/2015')},
        company: "DOJO",
        role: {
          eng: 'master',
          ita: 'mastro'
        },
        location:"filadelfia",
        info: {
          eng: 'thinks of thinks',
          ita: 'info di roba'
        },
        link:"www.mipiacitu"
    }, function(err,data){
      if(!err) console.log(data._id);
    });
  },
  education: function(){
    var Education = require('../models/Education.js');
    Education.remove({},function(err){
        if(!err) console.log('ok!');
    });
    Education.create({
        date: {begin:new Date('07/12/2014'), end:new Date('13/12/2015')},
        shool: {
          eng: 'university',
          ita: 'università'
        },
        degree: {
          eng: 'computer science',
          ita: 'informatica'
        },
        location:"milano",
        score:{
          eng: "3.5",
          ita: "100"
        }
    }, function(err,data){
      if(!err) console.log(data._id);
    });
  },
  projects: function(){
    var Projects = require('../models/Projects');
    Projects.all.remove({},function(err){
        if(!err) console.log('ok!');
    });

    Projects.item.create({
          name: {
            eng: "first project",
            ita: "primo progetto"
          },
          info: {
            eng: "info of first project",
            ita: "informazioni primo progetto"
          },
          link: "link"
      },function(err,data){
          Projects.all.create({name: {
            eng: "projects1",
            ita: "progetti1"
          },
          items:
            [data._id]
          }, function(err,data){
          if(!err) console.log(data._id);
      });});
    },
    skills: function(){
      var Skills = require('../models/Skills');
      Skills.all.remove({},function(err){
          if(!err) console.log('ok!');
      });

      Skills.item.create({
            name: "prima skill",
            point: 2
        },function(err,data){
            Skills.all.create({
              name: "primo skill gruppo",
              items: [data._id]
            }, function(err,data){
            if(!err) console.log(data._id);
        });});
      }
};


module.exports = test;
