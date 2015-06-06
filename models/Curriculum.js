var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users'},
    items: [{type:String, required:true}]
});

module.exports = mongoose.model('Curriculum', TodoSchema);
