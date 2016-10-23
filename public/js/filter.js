(function() {
  'use strict';

  /* Filters */

  angular.module('mySiteFilter', [])

  .filter('interpolate', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  })

  .filter('formatDate', ['languageServ', function(languageServ) {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }
    var mounth = {
      'ita': [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre'
      ],
      'eng': [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };
    function formatData(d) {
      if (!isNaN(d)) return [mounth[languageServ.get()][d.getMonth()], d.getFullYear()].join(' ');
      else
        if (languageServ.get() == 'eng') return 'on going';
        else return 'presente';
    }
    return function(date) {
      var start = new Date(date.begin);
      var end = new Date(date.end);
      return [formatData(start),
        formatData(end)
      ].join(' - ');
    };
  }])

  .filter('langFilter', ['languageServ', function(languageServ) {
    return function(item) {
      if (item)
        return item[languageServ.get()];
    };
  }]);
}());
