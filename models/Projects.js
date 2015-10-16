/* jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
  name: {type:String,required:true},
  info: {
    eng: {type:String},
    ita: {type:String}
  },
  link: {type:String},
  date: {
    begin: {type: Date},
    end: {type: Date}
  },
  category: { type: Schema.Types.ObjectId, ref: 'Projects' }
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

var projects = new Schema({
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

projects.virtual('id')
.get(function () {
  return this._id.toHexString();
});
/*
projects.statics.get = function(lang,cb){
  this.find({}).populate({path:'items'}) // only works if we pushed refs to children
    .exec(function (err, todos) {
        if (err) cb(err);
        //provvisorio capire come farlo fare a mongoDB
        var res = [];
        for (var i=0;i<todos.length;i++){
          res.push({name:todos[i].name[lang],items:[]});
          var items = todos[i].items;
          for (var j=0;j<items.length;j++){
            var item = {date: items[j].date,
                        link: items[j].link};
            if (items[j].name)
              item.name = items[j].name[lang];
            if (items[j].info)
              item.info = items[j].info[lang];
            res[i].items.push(item);
          }
        }
        console.log(res);
        cb(err,res);
  });
};*/

module.exports = {all:mongoose.model('Projects', projects),item:mongoose.model('PItem',item)};
