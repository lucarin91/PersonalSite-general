/* jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: {type:String,required:true},
  surname: {type:String,required:true},
  email: {type:String,required:true},
  telephone: {type:String},
  address: {type:String},
  bio:  {
    eng: {type:String},
    ita: {type:String}
  },
  img:  {type:String}
});

TodoSchema.statics.get = function (lang,cb) {
  return this.model('Me').aggregate({
   $project : {
       name: 1,
       surname: 1,
       email: 1,
       address: 1,
       telephone: 1,
       bio : "$bio."+lang,
       img: 1
   }}, function(err,data){
     cb(err,data ? data[0]:data);
   });
};

module.exports = mongoose.model('Me', TodoSchema);
