/* jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var education = new Schema({
    date: {
      begin: {type: Date, required:true},
      end: {type: Date}
    },
    school: {
      eng: {type:String},
      ita: {type:String}
    },
    degree: {
      eng: {type:String},
      ita: {type:String}
    },
    location: {type:String},
    score: {
      eng: {type:Number},
      ita: {type:Number}
    }
  },
    {
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
    }
);

education.virtual('id')
  .get(function () {
    return this._id.toHexString();
});

education.statics.get = function(lang,cb){
  /*return this.model('Education').aggregate({
   $project : {
       id: 1,
       //_id:0,
       school: "$school."+lang,
       degree: "$degree."+lang,
       location: 1,
       score : "$score."+lang,
       date: 1
   }}, cb);*/
   return this.find({},cb);
};
/*
if (!education.options.toObject) education.options.toObject = {};
education.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};
*/
module.exports = mongoose.model('Education', education);
