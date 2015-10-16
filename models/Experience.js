/* jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experience = new Schema({
    date: {
      begin: {type: Date, required:true},
      end: {type: Date}
    },
    company: {type:String, required:true},
    role: {
      eng: {type:String},
      ita: {type:String}
    },
    location: {type:String},
    info: {
      eng: {type:String},
      ita: {type:String}
    },
    link: {type:String}
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

experience.virtual('id')
  .get(function () {
    return this._id.toHexString();
});

experience.statics.get = function(lang,cb){
  return this.model('Experience').aggregate({
   $project : {
       company:1,
       info : "$info."+lang,
       role : "$role."+lang,
       date: 1,
       location:1,
       link:1
   }}, cb);
};

module.exports = mongoose.model('Experience', experience);
