angular.module('PSAcontroller', [])

.controller('LoginCtrl', function($scope, $state, $http, TokenService) {
    $scope.error = '';
    $scope.login = function(user, pass) {
        console.log("username: " + user + " - password: " + pass);
        $http.post('/api/authenticate', {
            user: user,
            password: pass
        }).success(function(data) {
            console.log(data);
            if (data.ok == 1) {
                TokenService.set(data.token);
                console.log($state);
                $state.go('dashboard');
            } else {
                $scope.error = "wrong username or password ";
                $scope.user = '';
                $scope.pass = '';
            }
        });
    };
});
