'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Services',[])
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
