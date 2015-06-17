var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: {type:String},
  surname: {type:String},
  email: {type:String},
  telephone: {type:String},
  address: {type:String},
  bio:  {
    eng: {type:String},
    ita: {type:String}
  },
  img:  {type:String}
});

module.exports = mongoose.model('Me', TodoSchema);
