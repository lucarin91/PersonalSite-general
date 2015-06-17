'use strict';

/* Services */



var mysiteServices = angular.module('mysiteServices', ['ngResource']);


mysiteServices.factory('MeService',['$resource',
  function($resource){
    return $resource('/api/:language/me',{language:'@lang'}, {
      getMe: {method:'GET', isArray:false},
      postMe: {method:'POST'}
      //putaction: {method:'PUT', isArray:true},
      //deleteaction: {method:'DELETE' isArray:true}
    });
}]);

mysiteServices.factory('CurriculumService',['$resource',
  function($resource){
    return $resource('/api/:language/curriculum',{language:'@lang'}, {
      getCurriculum:{method:'GET', isArray:false}
      //getCurriculum: {method:'GET'}
      //putaction: {method:'PUT', isArray:true},
      //deleteaction: {method:'DELETE' isArray:true}
    });
}]);


// Demonstrate how to register services
// In this case it is a simple value service.
/*angular.module('Services',[])
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
*/
