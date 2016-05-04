angular.module('Auth').controller('RegisterController',
    ['$scope', '$rootScope', '$location', 'authenticationService','$state', '$cookieStore',
    function ($scope, $rootScope, $location, authenticationService, $state, $cookieStore) {
        // reset login status
        authenticationService.ClearCredentials();

        $scope.register = function () {
            $scope.dataLoading = true;
            authenticationService.Register($scope.name, $scope.email, $scope.username, $scope.password, function (response) {
                if (response.success) {
                    authenticationService.SetCredentials($scope.username, $scope.password);
                    $state.go('consumer');
                    $location.path('/consumerID');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
