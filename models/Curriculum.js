/* jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    date: {type: Date, required:true},
    name: {
      eng: {type:String},
      ita: {type:String}
    },
    info: {
      eng: {type:String},
      ita: {type:String}
    }
});

module.exports = mongoose.model('Curriculum', TodoSchema);
