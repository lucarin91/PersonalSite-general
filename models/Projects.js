var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    name: {
      eng: {type:String},
      ita: {type:String}
    },
    items:
      [{
          name: {
            eng: {type:String},
            ita: {type:String}
          },
          info: {
            eng: {type:String},
            ita: {type:String}
          },
          link: {type:String}
      }]
  });

module.exports = mongoose.model('Projects', TodoSchema);
