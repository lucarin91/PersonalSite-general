'use strict';

var mysiteApp = angular.module('mysiteApp',[
  'ngRoute',
  'mysiteControllers',
  'mysiteServices'
]);

mysiteApp.config (['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider){
    $routeProvider.
      when('/:lang/me', {
        templateUrl: 'html/me',
        controller: 'HomeCtrl',
        resolve: {
          me:function(MeService, $route){
            return MeService.getMe({language:$route.current.params.lang})
          }
        }
      }).
      when('/:lang/curriculum',{
        templateUrl: 'html/curriculum',
        controller: 'CurriculumCtrl'
      })
      .otherwise({
        redirectTo: '/ita/me'
      });
      // configure html5 to get links working on jsfiddle
      $locationProvider.html5Mode(true);
  }]);
/*
angular.module('PersonalSite',[
  'ngRoute',
  'Controllers',
  'Services',
  'Directives'
  ])
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'html/me',
    controller: 'HomeCtrl',
    resolve: {
      me:function(JsonLoader){
        return JsonLoader.get('json/me.json');
      }
    }
  })
  .when('/curriculum', {
    title: 'curriculum',
    templateUrl: 'html/curriculum',
    controller: 'CurriculumCtrl',
    resolve: {
      curriculum:function(JsonLoader){
        return JsonLoader.get('json/curriculum.json');
      },
      skills:function(JsonLoader){
        return JsonLoader.get('json/skills.json');
      }
    }
  })
  .when('/project',{
    title: 'project',
    templateUrl: 'html/projects',
    controller: 'ProjectCtrl',
    resolve: {
      projects:function(JsonLoader){
        return JsonLoader.get('json/projects.json');
      }
    }
  })
  .when('/contact',{
    title: 'contact',
    templateUrl: 'html/contact',
    controller: 'ContactCtrl',
    resolve: {}
  })
  .otherwise({
    redirectTo: '/'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
}]);
*/
