'use strict';

/* Services */
angular.module('mysiteService', ['ngResource'])
//for the language of the site
.factory('languageServ', [function(){
  var language = 'ita';
  return {
    setIta:function(){
      language='ita';
    },
    setEng: function(){
      language='eng';
    },
    get: function(){
      return language;
    }
  }
}])

.factory('APIService',['$resource',
  function($resource){
    return {
      me: $resource('/api/me'),
      edu: $resource('/api/education'),
      exp: $resource('/api/experience'),
      skill: $resource('/api/skills'),
      skillCat: $resource('/api/skillscat'),
      pro: $resource('/api/projects'),
      proCat: $resource('/api/projectscat')
    }
}])
/*
.factory('EducationService',['$resource',
  function($resource){
    return $resource('/api/education', {
      get: {method:'GET', isArray:true}
    });
}])

.factory('ExperienceService',['$resource',
  function($resource){
    return $resource('/api/:language/experience',{language:'@lang'}, {
      getExperience: {method:'GET', isArray:true}
    });
}])



.factory('SkillsService',['$resource',
  function($resource){
    return $resource('/api/:language/skills',{language:'@lang'}, {
      getSkills: {method:'GET', isArray:true}
    });
}])

.factory('ProjectsService',['$resource',
  function($resource){
    return $resource('/api/:language/projects',{language:'@lang'}, {
      getProjects: {method:'GET', isArray:true}
    });
}])
*/
// Demonstrate how to register services
// In this case it is a simple value service.
.factory('JsonLoader',['$http',
  function($http){
    return {
      get: function(path){
        return $http({
          method: 'GET',
          url: path
        });
      }
    }
}]);
