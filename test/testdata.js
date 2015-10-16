var loremIpsum = require('lorem-ipsum');
var loremPar = ['words','sentences','paragraphs'];
var randomInt = function(min,max){
  return Math.floor((Math.random() * (max-min+1)) + min);
};

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

var randomDateObj = function(){
  var begin = randomDate(new Date('1/1/2010'),new Date());
  return {
    begin: begin,
    end: randomDate(begin,new Date())
  };
};

var test={
  me: function(){
    var Me = require('../models/Me.js');
    Me.remove({}).exec();
    Me.create({
      name: 'Luca',
      surname: 'Rinaldi',
      email: 'lucarin91@gmail.com',
      telephone: '+39455 4567888',
      address: loremIpsum({count: 4, units: loremPar[0]}),
      bio:  {
        eng: loremIpsum({count: 2, units: 'paragraphs'/*words,sentences,paragraphs*/ }),
        ita: loremIpsum({count: 2, units: 'paragraphs'})
      },
      img: 'http://lorempixel.com/200/200/abstract/'
    });
  },
  experience: function(){
    var Experience = require('../models/Experience');
    Experience.remove({}).exec();
    for (var i=0; i<4; i++){
      Experience.create({
          date: randomDateObj(),
          company: loremIpsum({count: 2, units: loremPar[0] }),
          role: {
            eng: loremIpsum({count: 1, units: loremPar[0]}),
            ita: loremIpsum({count: 1, units: loremPar[0]})
          },
          location: loremIpsum({count: 1, units: loremPar[0]}),
          info: {
            eng: loremIpsum({count: 2, units: loremPar[1]}),
            ita: loremIpsum({count: 2, units: loremPar[1]})
          },
          link: 'http://'+loremIpsum({count: 1, units: loremPar[0]})
      });
    }
  },
  education: function(){
    var Education = require('../models/Education.js');
    Education.remove({},function(err){
        if(!err) console.log('ok!');
    });
    for(var i=0;i<3;i++){
      Education.create({
          date: randomDateObj(),
          school: {
            eng: loremIpsum({count: 2, units: loremPar[0]}),
            ita: loremIpsum({count: 2, units: loremPar[0]})
          },
          degree: {
            eng: loremIpsum({count: 3, units: loremPar[0]}),
            ita: loremIpsum({count: 3, units: loremPar[0]})
          },
          location: loremIpsum({count: 1, units: loremPar[0]}),
          score:{
            eng: ""+randomInt(1,4),
            ita: ""+randomInt(80,110)
          }
      });
    }
  },
  projects: function(){
    var Projects = require('../models/Projects');
    Projects.all.remove({}).exec();
    Projects.item.remove({}).exec();
    for (var i=0; i<2;i++){
      Projects.all.create({name: {
        eng: loremIpsum({count: 2, units: loremPar[0]}),
        ita: loremIpsum({count: 2, units: loremPar[0]})
      }}, function(err,dataAll){
          for (var j=0; j<3;j++){
            Projects.item.create({
                  name: loremIpsum({count: 2, units: loremPar[0]}),
                  info: {
                    eng: loremIpsum({count: 2, units: loremPar[1]}),
                    ita: loremIpsum({count: 2, units: loremPar[1]})
                  },
                  date: randomDateObj(),
                  link: 'http://'+loremIpsum({count: 1, units: loremPar[0]}),
                  category: dataAll._id
              },function(err,dataItems){
                //Projects.all.update({_id:dataAll._id},{$addToSet:{items:dataItems._id}}).exec();
              });
            }
        });
      }
    },
    skills: function(){
      var Skills = require('../models/Skills');
      Skills.all.remove({}).exec();
      Skills.item.remove({}).exec();
      for (var i=0; i<2;i++){
        Skills.all.create({name: {
          eng: loremIpsum({count: 2, units: loremPar[0]}),
          ita: loremIpsum({count: 2, units: loremPar[0]})
        }},function(err,dataAll){
            for (var j=0; j<8;j++){
              Skills.item.create({
                    name: {
                      eng: loremIpsum({count: 1, units: loremPar[0]}),
                      ita: loremIpsum({count: 1, units: loremPar[0]})
                    },
                    point: randomInt(1,3),
                    category: dataAll._id
                },function(err,dataItems){
                  //Skills.all.update({_id:dataAll._id},{$addToSet:{items:dataItems._id}}).exec();
                });
              }
          });
        }
      }
};


module.exports = test;
