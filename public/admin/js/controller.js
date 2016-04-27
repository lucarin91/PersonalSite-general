angular.module('PSAcontroller', [])

.controller('LoginCtrl', function($scope, $state, $http, TokenService){
  $scope.error = '';
  $scope.login = function(user, pass){
    $http.post({user:user,password:pass}).success(function(data){
      if (data.ok==1){
        TokenService.set(data.token);
        $state.go('/');
      } else $scope.error = "wrong username or password";
    });
  };
});
