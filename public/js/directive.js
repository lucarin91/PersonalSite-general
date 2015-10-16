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
