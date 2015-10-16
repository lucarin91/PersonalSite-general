(function() {
  'use strict';

  /* Filters */

  angular.module('mySiteFilter', [])

  .filter('interpolate', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  })

  .filter('formatDate', function() {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    return function(date) {
      var start = new Date(date.begin);
      var end = new Date(date.end);
      return [
        [pad(start.getDate()), pad(start.getMonth() + 1), start.getFullYear()].join('/'), [pad(end.getDate()), pad(end.getMonth() + 1), end.getFullYear()].join('/')
      ].join(' - ');
    }
  })

  .filter('langFilter', ['languageServ', function(languageServ) {
    return function(item) {
      return item[languageServ.get()];
    };
  }]);
}());
