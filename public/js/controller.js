"use strict";

angular.module('mysiteController',[])
.controller('HomeCtrl', ['$scope','me','language','siteText',
  function($scope,me,language,siteText){
    $scope.me = me;
    $scope.siteText = siteText;

    $scope.test = 'ciao!';
    $scope.mod = false;
  /*  $scope.click = function(){
      console.log('click!');
      $scope.mod = !$scope.mod;
      console.log($scope.mod);*/
    //};
 }])

.controller('MeCtrl',['$scope','me',
  function ($scope,me){
    console.log(me);
    $scope.me = me;
}])

.controller('EducationCtrl',['$scope','education',
   function ($scope,education){
     console.log(education);
     $scope.e = education;
}])

.controller('ProjectsCtrl',['$scope','projects',
   function ($scope,projects){
     $scope.projects = projects;
}])

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
