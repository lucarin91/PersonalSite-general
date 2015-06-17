var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
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
});

module.exports = mongoose.model('Curriculum', TodoSchema);
