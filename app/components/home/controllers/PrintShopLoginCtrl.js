angular.module('Auth').controller('PrintShopLoginCtrl',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$state', '$cookieStore',
    function ($scope, $rootScope, $location, AuthenticationService, $state, $cookieStore) {
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
                    } else if(response.employee.roles[0] == "ROLE_EMPLOYEE") {
                      console.log("Manager logged in...");
                    }
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

    }]);
