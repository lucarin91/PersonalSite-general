angular.module('PSAservice', [ ])

.factory('TokenService', function(Restangular) {
    var token = '';
    return {
        is: function (){
            return token !== '';
        },
        get: function(){
            return token;
        },
        set: function(t){
            token = t;
            Restangular.setDefaultHeaders({
                'Authorization': 'Bearer ' + t
            });
        }
    };
});
