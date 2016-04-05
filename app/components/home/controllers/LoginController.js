angular.module('Auth').controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$state', '$cookieStore',
    function ($scope, $rootScope, $location, AuthenticationService, $state, $cookieStore) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
               console.log(response);
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/consumerID');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

    }]);
