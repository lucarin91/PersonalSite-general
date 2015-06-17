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

  var view = {
    me: {
      name: 'luca',
      surname: 'rinaldi',
      mail:'asd',
      tel: '324234234234',
      address: 'asdasdasd'
    },
    education:[{
        school: 'scuola',
        degree: 'roba',
        date: {start:"asd",end:"asd"},
        location: "pisa",
        score:"tanto"
      }],
    language:{
      native: "italiano",
      other:[
        {name:"inglese",level:"B1"}
      ]
    },
    skills:[{
      name:"skill",
      items:[{
        name:"c"
      }]
    }]
  };

  fs.readFile(texPath+'/cv.tex.template', 'utf8', function (err,data) {
    if (err) return console.log(err);
    var tex = mustache.render(data, view);
    fs.writeFile(texPath+'/cv.tex', tex, function (err) {
      if (err) return console.log(err);
      cp.exec('cd '+texPath+' && xelatex -interaction=nonstopmode cv.tex',
        function (err, stdout, stderr) {
          var pdf = path.join(texPath, 'cv.pdf');
          console.log(stdout);
          res.sendfile(pdf);
        });
      });
    });
});

module.exports = router;
