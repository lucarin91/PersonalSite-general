/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var sys   = require('sys'),
    cp = require('child_process'),
    spawn = require('child_process').spawn,
    path = require('path'),
    //mu = require('mu2'),
    mustache = require('mustache'),
    fs = require('fs');
//var authController = require('../controllers/auth');
//var mongoose = require('mongoose');
//var Me = require('../../models/Me.js');

/* GET /me listing. */
router.get('/', function(req, res, next) {
  var texPath = path.join(__dirname, '/../../latex');

  var Me = require('../../models/Me');
  var Education = require('../../models/Education');
  var Experience = require('../../models/Experience');
  var Projects = require('../../models/Projects');
  var Skills = require('../../models/Skills');

  var view = {formatDate: function () {
      return function (text, render) {
        var date = new Date(render(text));
        return date.getDate()+'/'+ (date.getMonth()+1)+'/'+date.getFullYear();
      };
    }
  };

  Me.get(req.lang,function(err,data){
    console.log(data);
    view.me = data;
    Education.get(req.lang,function(err,data){
      //console.log('education');
      view.education = data;
      Experience.get(req.lang,function(err,data){
        //console.log('experience');
        view.experience = data;
        Projects.all.get(req.lang,function(err,data){
          //console.log(data);
          view.projects = data;
          Skills.all.get(function(err,data){
            view.skills = data;
            //res.json(view);

            fs.readFile(texPath+'/cv.tex.template', 'utf8', function (err,data) {
              if (err) return console.log(err);
              var tex = mustache.render(data, view);
              fs.writeFile(texPath+'/cv.tex', tex, function (err) {
                if (err) return console.log(err);
                cp.exec('cd '+texPath+' && xelatex -interaction=nonstopmode cv.tex',
                  function (err, stdout, stderr) {
                    var pdf = path.join(texPath, 'cv.pdf');
                    //console.log(stdout);
                    console.log('err: '+err);
                    //console.log('stderr: '+stderr);
                    //console.log('stdout: '+stdout);
                    //if(err) return next(new Error('latex compilation error!',err));
                    res.sendfile(pdf);
                  });
                });
              });
          });
        });
      });
    });
  });
});

module.exports = router;
