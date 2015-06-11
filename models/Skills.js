var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: {type:String, required:true},
  items: [{ type: Schema.Types.ObjectId, ref: 'SItems' }]
});

var item = new Schema({
    name: {type:String, required:true},
    point: {type:Number, required:true}
});

module.exports = {all: mongoose.model('Skills', TodoSchema), item: mongoose.model('SItems',item)};
