angular.module('Auth').controller('AdminLoginController',
    ['$scope', 'AuthenticationService','$state',
    function ($scope, AuthenticationService, $state) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
               console.log(response);
                if (response.success) {
                    if(!response.user.roles[0] == "ROLE_ADMIN") {
                      AuthenticationService.SetCredentials($scope.username, $scope.password);
                      $state.go('admin.requests', {"username": $scope.username});
                      return;
                    }
                }
                $scope.error = "Dados de login inválidos!";
                $scope.dataLoading = false;
            });
        };

    }]);
