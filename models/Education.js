var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var education = new Schema({
    date: {
      begin: {type: Date, required:true},
      end: {type: Date}
    },
    school: {
      eng: {type:String},
      ita: {type:String}
    },
    degree: {
      eng: {type:String},
      ita: {type:String}
    },
    location: {type:String},
    score: {
      eng: {type:String},
      ita: {type:String}
    }
});

education.statics.get = function(lang,cb){
  return this.model('Education').aggregate({
   $project : {
       school: "$school."+lang,
       degree: "$degree."+lang,
       location: 1,
       score : "$score."+lang,
       date: 1
   }}, cb);
};

module.exports = mongoose.model('Education', education);
