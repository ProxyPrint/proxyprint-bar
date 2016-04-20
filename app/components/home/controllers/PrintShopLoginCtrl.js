angular.module('Auth').controller('PrintShopLoginCtrl',
    ['$scope', 'AuthenticationService','$state',
    function ($scope, AuthenticationService, $state) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.LoginEmployee($scope.username, $scope.password, function (response) {
               console.log(response);
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    if(response.employee.roles[0] == "ROLE_EMPLOYEE") {
                      $state.go('employee', {"username": $scope.username});
                    } else if(response.employee.roles[0] == "ROLE_MANAGER") {
                      console.log("Manager logged in...");
                    }
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

    }]);
