/* jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSkill = new Schema({
  name: {
    eng: {type:String},
    ita: {type:String}
  }
},
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
groupSkill.virtual('id')
.get(function () {
  return this._id.toHexString();
});

var item = new Schema({
    name: {
      eng: {type:String},
      ita: {type:String}
    },
    point: {type:Number, required:true},
    category: { type: Schema.Types.ObjectId, ref: 'Skills' }
},
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
item.virtual('id')
.get(function () {
  return this._id.toHexString();
});

groupSkill.statics.get = function(cb){
  return this.find({}).populate({path:'items'}).exec(cb);
};

module.exports = {  all: mongoose.model('Skills', groupSkill),
                    item: mongoose.model('SItems',item)
                  };
