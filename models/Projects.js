var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var item = new Schema({
  name: {
    eng: {type:String},
    ita: {type:String}
  },
  info: {
    eng: {type:String},
    ita: {type:String}
  },
  link: {type:String}

});

var projects = new Schema({
    name: {
      eng: {type:String},
      ita: {type:String}
    },
    items:[{ type: Schema.Types.ObjectId, ref: 'PItem' }]
  });

module.exports = {all:mongoose.model('Projects', projects),item:mongoose.model('PItem',item)};
