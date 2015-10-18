(function() {
  'use strict';

  /* Directives */

  angular.module('mysiteDirectives', [])
    .directive('appVersion', function(version) {
      return function(scope, elm, attrs) {
        elm.text(version);
      };
    })

  .directive('testinput', function() {
      return {
        restrict: 'E',
        /*replace: true,*/
        trasclude: true,
        templateUrl: '/html/template/testinput.html',
        //template: '<div ng-hide="mod" ng-bind="{{text}}"></div><input ng-show="modify" value="{{text}}"/>',
        replace: true,
        scope: {
          mod: '=',
          text: '='
        }
      };
    })
    .directive('skillbar', function() {
      return {
        restrict: 'E',
        // trasclude: true,
        terminal: true,
        priority: 1000,
        templateUrl: '/html/template/skill_bar.html',
        scope: {
          point: '@'
        },
        link: function(scope, element, attrs) {
          var p = scope.point;
          console.log(p);
          if (p >= 1 && p <= 3)
            scope.img = '/img/skill' + p + '.png';
          console.log(scope.img);
        }
      };
    })
    .directive('modbutton', function() {
      return {
        restrict: 'E',
        /*replace: true,*/
        trasclude: true,
        template: '<button ng-click="click()">mod!</button>',
        controller: function($scope, $element) {
          $scope.click = function() {
            $scope.mod = !$scope.mod;
          };
        },
        replace: true,
        scope: {
          mod: '='
        }
      };
    });
}());
