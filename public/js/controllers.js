"use strict";

var mysiteControllers = angular.module('mysiteControllers',[])

mysiteControllers.controller('HomeCtrl', ['$scope','me',
  function($scope,me){
    $scope.me = me
    /*
    $scope.me = MeService.getMe({language:'ita'});
    $scope.me.bio= "sonoa molto arrabst";
    MeService.postMe({language:'ita'},$scope.me)
    */
 }]);

 mysiteControllers.controller('CurriculumCtrl',['$scope','CurriculumService',
  function ($scope,CurriculumService){
    $scope.curriculum = CurriculumService.getCurriculum({language:'ita'});
  }]);

/*
angular.module('Controllers',[])

.controller('HomeCtrl',['$scope','me',
function($scope,me){
  $scope.me=me.data;
}])
.controller('CurriculumCtrl',['$scope','curriculum','skills',
function($scope,curriculum,skills){
  $scope.curriculum=curriculum.data;
  $scope.skills=skills.data;

  $scope.percentia=function(d){
    return (100*d)/3 + '%';
  };
}])
.controller('ProjectCtrl',['$scope','projects',
function($scope,projects){
  $scope.projects=projects.data;
}])
.controller('ContactCtrl',['$scope',
function($scope){

}]);
*/
