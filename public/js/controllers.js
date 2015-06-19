"use strict";

var mysiteControllers = angular.module('mysiteControllers',[])

mysiteControllers.controller('HomeCtrl', ['$scope','me','language',
  function($scope,me,language){
    $scope.me = me;
    //console.log(language);
 }]);

 mysiteControllers.controller('CurriculumCtrl',['$scope','education','experience','skills','language',
  function ($scope,education,experience,skills,language){
    $scope.experience = experience;
    $scope.education = education;
    $scope.skills = skills;
  //  console.log(language);
    $scope.strExperience = language=='ita'?'Esperienze':'Experience';
  }]);

  mysiteControllers.controller('ProjectsCtrl',['$scope','projects',
   function ($scope,projects){
     $scope.projects = projects;
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
