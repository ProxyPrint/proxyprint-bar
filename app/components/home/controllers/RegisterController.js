angular.module('Auth').controller('RegisterController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$state', '$cookieStore',
    function ($scope, $rootScope, $location, AuthenticationService, $state, $cookieStore) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.register = function () {
            $scope.dataLoading = true;
            AuthenticationService.Register($scope.name, $scope.email, $scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/consumerID');
                    $state.go('consumer');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
