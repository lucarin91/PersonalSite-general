angular.module('PSAservice', [])

.factory('TokenService', function() {
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
        }
    };
});
