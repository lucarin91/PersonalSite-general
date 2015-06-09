var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  bio:  {
    eng: {type:String},
    ita: {type:String}
  },
  img:  {type:String}
});

module.exports = mongoose.model('Me', TodoSchema);
