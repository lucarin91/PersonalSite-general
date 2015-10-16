(function() {
  'use strict';

  var mysiteApp = angular.module('mysiteApp', [
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',
    'mysiteController',
    'mysiteService',
    'mysiteDirectives',
    'mySiteFilter'
  ])

  .run(['$rootScope', 'languageServ', '$state', function($rootScope, languageServ, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toParams.lang == 'ita' || toParams.lang == 'eng') {
        languageServ.set(toParams.lang);
      } else {
        event.preventDefault();
        $state.go('menu', {
          lang: 'ita'
        });
      }
    });
  }])

  .config(function($translateProvider) {
    $translateProvider.translations('eng', {
      EDU: 'Education',
      EXP: 'Experience',
      SKI: 'Skills',
      PRO: 'Projects',
      CON: 'Contacts'
    });
    $translateProvider.translations('ita', {
      EDU: 'Educazione',
      EXP: 'Esperienze',
      SKI: 'Skills',
      PRO: 'Progetti',
      CON: 'Contatti'
    });
    $translateProvider.useSanitizeValueStrategy('sanitize');
    //$translateProvider.preferredLanguage('ita');
  })

  .config(function($stateProvider, $locationProvider) {
    $stateProvider
      .state('menu', {
        url: "/{lang}",
        templateUrl: "html/menu.html",
        controller: 'MenuCtrl'
      })
      .state('menu.me', {
        url: "/me",
        views: {
          "viewMe": {
            templateUrl: "html/me.html",
            controller: 'MeCtrl',
            resolve: {
              me: function(APIService) {
                console.log('resolveMe');
                return APIService.me.get();
              }
            }
          }
        }
      })
      .state('menu.education', {
        url: "/education",
        views: {
          "viewEducation": {
            templateUrl: "html/education.html",
            controller: 'EducationCtrl',
            resolve: {
              education: function(APIService) {
                return APIService.edu.query();
              }
            }
          }
        }
      })
      .state('menu.experience', {
        url: "/experience",
        views: {
          "viewExperience": {
            templateUrl: "html/experience.html",
            controller: 'ExperienceCtrl',
            resolve: {
              experience: function(APIService) {
                return APIService.exp.query();
              }
            }
          }
        }
      })
      .state('menu.skills', {
        url: "/skills",
        views: {
          "viewSkills": {
            templateUrl: "html/skills.html",
            controller: 'SkillsCtrl',
            resolve: {
              skills: function(APIService) {
                return APIService.skill.query();
              },
              skillscat: function(APIService) {
                return APIService.skillCat.query();
              }
            }
          }
        }
      })
      .state('menu.projects', {
        url: "/projects",
        views: {
          "viewProjects": {
            templateUrl: "html/projects.html",
            controller: 'ProjectsCtrl',
            resolve: {
              projects: function(APIService) {
                return APIService.pro.query();
              },
              projectscat: function(APIService) {
                return APIService.proCat.query();
              }
            }
          }
        }
      })
      .state('menu.contacts', {
        url: "/contacts",
        views: {
          "viewContacts": {
            template: ""
          }
        }
      });
    $locationProvider.html5Mode(true);
  });
  /*
  mysiteApp.run( function($rootScope, $location, language) {
      // register listener to watch route changes
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          language = next.params.lang;
          //console.log();
        })
      });
  *
  mysiteApp.run(['$rootScope','JsonLoader', function($rootScope,JsonLoader) {
      $rootScope.$on("$routeChangeStart", function (event, next, current) {
          if (next.params.lang=='ita') {
             console.log("italiani");
              $rootScope.siteText =  JsonLoader.get('/json/itasite.json');
               console.log($rootScope.siteText);
          }
          else {
            console.log("inglesei");
               $rootScope.siteText = JsonLoader.get('/json/engsite.json');
          }
    });
  }]);
  */
  /*mysiteApp.config (['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider){
      $routeProvider.
        when('/:lang/me', {
          templateUrl: 'html/me.html',
          controller: 'HomeCtrl',
          resolve: {
            me:function(MeService, $route){
              return MeService.getMe({language:$route.current.params.lang});
            },
            siteText:function(JsonLoader,$route){ // the text for the template site:english or italian
                if($route.current.params.lang =='ita'){
                  return JsonLoader.get('/json/itasite.json');
                }
                else{
                   return JsonLoader.get('/json/engsite.json');
                }
            }
          }
        }).
        when('/:lang/curriculum',{
          templateUrl: 'html/curriculum.html',
          controller: 'CurriculumCtrl',
          resolve: {
            education:function(EducationService, $route){
              return EducationService.getEducation({language: $route.current.params.lang});
            },
            experience:function(ExperienceService, $route){
              return ExperienceService.getExperience({language: $route.current.params.lang});
            },
            skills : function(SkillsService, $route){
              return SkillsService.getSkills({language :$route.current.params.lang});
            },
            siteText:function(JsonLoader,$route){ // the text for the template site:english or italian
                if($route.current.params.lang =='ita'){
                  return JsonLoader.get('/json/itasite.json');
                }
                else{
                   return JsonLoader.get('/json/engsite.json');
                }
            }
          }
        }).
        when('/:lang/projects',{
          templateUrl: 'html/projects.html',
          controller: 'ProjectsCtrl',
          resolve: {
            projects:function(ProjectsService, $route){
              return ProjectsService.getProjects({language:$route.current.params.lang})
            }
          }
        })/*.
        when('/:lang/contacts',{
          templateUrl: 'html/projects',
          controller: 'ProjectCtrl',
          resolve: {
            projects:function(ProjectsService, $route){
              return ProjectsService.getProjects({language:$route.current.params.lang})
            }
          }
        })*/
  /*
        .otherwise({
          redirectTo: '/ita/me'
        });
        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    }]);
    */
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
}());
