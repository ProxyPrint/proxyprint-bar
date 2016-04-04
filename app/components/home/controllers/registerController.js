angular.module('Auth').controller('RegisterController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$state',
    function ($scope, $rootScope, $location, AuthenticationService, $state) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.register = function () {
            $scope.dataLoading = true;
            AuthenticationService.Register($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/:userID');
                    $state.go('costumer');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
