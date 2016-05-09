(function() {
  'use strict';

  /* Services */
  angular.module('mysiteService', ['ngResource'])
    //for the language of the site
    .factory('languageServ', ['$state', '$translate',
      function($state, $translate) {
        var language = 'ita';

        function updateURL() {
          $state.go($state.current, {
            lang: language
          });
        }

        function updateTranslation() {
          $translate.use(language);
        }

        return {
          changeToIta: function() {
            language = 'ita';
            updateURL();
          },
          changeToEng: function() {
            language = 'eng';
            updateURL();
          },
          set: function(l) {
            if (l == 'ita' || l == 'eng'){
              language = l;
              updateTranslation();
            }
          },
          get: function() {
            return language;
          },
          isIta: function() {
            return 'ita' == language;
          },
          isEng: function(argument) {
            return 'eng' == language;
          }
        };
      }
    ])

  .factory('APIService', ['$resource',
      function($resource) {
        return {
          me: $resource('/api/me'),
          edu: $resource('/api/education'),
          exp: $resource('/api/experience'),
          skill: $resource('/api/skills'),
          skillCat: $resource('/api/skillscat'),
          pro: $resource('/api/projects'),
          proCat: $resource('/api/projectscat')
        };
      }
    ])
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
    .factory('JsonLoader', ['$http',
      function($http) {
        return {
          get: function(path) {
            return $http({
              method: 'GET',
              url: path
            });
          }
        };
      }
    ]);
}());
