var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
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
      eng: {type:String},
      ita: {type:String}
    }
});

module.exports = mongoose.model('Curriculum', TodoSchema);
