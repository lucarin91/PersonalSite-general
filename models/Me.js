var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  bio:  {type:String,required:false},
  img:  {type:String,required:false}
});

module.exports = mongoose.model('Me', TodoSchema);
