(function() {
  'use strict';

  var mysiteApp = angular.module('mysiteApp', [
    //'ngRoute',
    'ui.router',
    'ngSanitize',
    'pascalprecht.translate',
    'mysiteController',
    'mysiteService',
    'mysiteDirectives',
    'mySiteFilter'
  ])

  .run(['$rootScope', '$stateParams', 'languageServ', '$state',
      function($rootScope, $stateParams, languageServ, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          //console.log(toState);
          //console.log(fromState);
          //event.preventDefault();
          // transitionTo() promise will be rejected with
          // a 'transition prevented' error
          console.log('changeStart');
          console.log(toParams);
          if (toParams.lang == 'it') {
            languageServ.setIta();
          } else if (toParams.lang == 'en') {
            languageServ.setEng();
          } else {
            console.log('redirect');
            $state.go('home', {
              lang: 'it'
            });
          }


        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
          console.log('changed');
          /*if ($stateParams.lang !== undefined) {
            var otherLang = $stateParams.lang === 'da' ? 'en' : 'da';
            $rootScope.activeLang = $stateParams.lang;
            $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' + otherLang);
            $translate.use($stateParams.lang);
          }*/
        });
        $rootScope.$on('$stateChangeError', function(error) {
          console.log(error);
        });
      }
    ])
    .controller('menuController', function($scope, $state, languageServ) {
      var current = null;
      $scope.goto = function(route) {
        console.log(languageServ.get());
        if (route === current)
          route = 'home';
        current = route;
        $state.go(route, {
          lang: languageServ.get()
        });
      };

      $scope.isActive = function(route) {
        //console.log($state.is(route));
        return $state.is(route);
      };
    })

  .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/it');
    $stateProvider
    /*.state('app', {
      abstract: true,
      url: '/{lang:(?:it|en)}',
      template: "<ui-view/>"
    })*/
      .state('home', {
        url: "/{lang:(?:it|en)}"
      })
      .state('me', {
        url: "/{lang:(?:it|en)}/me",
        views: {
          "view.me@": {
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
      .state('education', {
        url: "/{lang:(?:it|en)}/education",
        views: {
          "view.education": {
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
      .state('experience', {
        url: "/{lang:(?:it|en)}/experience",
        views: {
          "view.experience": {
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
      .state('skills', {
        url: "/{lang:(?:it|en)}/skills",
        views: {
          "view.skills": {
            templateUrl: "html/skills.html",
            controller: 'SkillsCtrl',
            resolve: {
              skills: function(APIService) {
                console.log('skills');
                return APIService.skill.query();
              },
              skillscat: function(APIService) {
                console.log('skillscat');
                return APIService.skillCat.query();
              }
            }
          }
        }
      })
      .state('projects', {
        url: "/{lang:(?:it|en)}/projects",
        views: {
          "view.projects": {
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
      .state('contacts', {
        url: "/{lang:(?:it|en)}/contacts",
        views: {
          "view.contacts": {
            template: ""
          }
        }
      });
    $locationProvider.html5Mode(true);
  })

  .config(['$translateProvider', function($translateProvider) {
    $translateProvider.translations('en', {
      'EDU': 'Education',
      'EXP': 'Experience',
      'SKILL': 'Skills',
      'PROJECT': 'Projects',
      'CONTACT': 'Contacts'
    });

    $translateProvider.translations('it', {
      'EDU': 'Educazione',
      'EXP': 'Esperienze',
      'SKILL': 'Skills',
      'PROJECT': 'Progetti',
      'CONTACT': 'Contatti'
    });

    $translateProvider.preferredLanguage('it');
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }]);
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
