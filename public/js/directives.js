'use strict';

/* Directives */

angular.module('Directives', [])
  .directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })

.directive('testinput', function() {
  return {
    restrict : 'E',
    /*replace: true,*/
    trasclude:true,
    link : function(scope, element, attrs) {
      scope.modVar = false;
      scope.modify = function(){
        scope.modVar=!scope.modVar;
      };
      var render = function() {
        var mod = scope.modVar;
        console.log(element.text());
        var button = '<button ng-click="modify()" type="button">mod!</button>';
        if (mod) {
          element.html('<input value="'+element.text()+'"></input>'+button);
        }else {
          element.html(element.text()+button);
        }
      };
      //key point here to watch for changes of the type property
      scope.$watch(scope.modVar, function(newValue, oldValue) {
        console.log('watch!');
        render();
      });

      render();
    }
  };
});
