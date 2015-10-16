(function() {
  "use strict";

  angular.module('mysiteController', [])
    .controller('MenuCtrl', ['$scope', '$state', 'languageServ',
      function($scope, $state, languageServ) {
        var current = null;
        $scope.goto = function(route) {
          if (route === current)
            route = 'menu';
          current = route;
          $state.go(route, {
            lang: languageServ.get()
          });
        };
        $scope.isActive = function(route) {
          //console.log($state.is(route));
          return $state.is(route);
        };
      }
    ])

  .controller('FooterCtrl', ['$scope', 'languageServ',
    function($scope, languageServ) {
      $scope.ln = languageServ;
    }
  ])

  .controller('MeCtrl', ['$scope', 'me',
    function($scope, me) {
      $scope.me = me;
    }
  ])

  .controller('EducationCtrl', ['$scope', 'education',
    function($scope, education) {
      console.log(education);
      $scope.e = education;
    }
  ])

  .controller('ProjectsCtrl', ['$scope', 'projects', 'projectscat',
    function($scope, projects, projectscat) {
      console.log(projects);
      $scope.cat = projectscat;
      $scope.p = projects;
    }
  ])

  .controller('SkillsCtrl', ['$scope', 'skills', 'skillscat',
    function($scope, skills, skillscat) {
      $scope.s = skills;
      $scope.cat = skillscat;
    }
  ])

  .controller('ExperienceCtrl', ['$scope', 'experience', function($scope, experience) {
    $scope.e = experience;
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
}());
