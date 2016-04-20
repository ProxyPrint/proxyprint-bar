angular.module('Auth').controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$state', '$cookieStore',
    function($scope, $rootScope, $location, AuthenticationService, $state, $cookieStore) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function() {
            $scope.dataLoading = true;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    $rootScope.position = position;
                    console.log($rootScope.position.coords.latitude);
                    console.log($rootScope.position.coords.longitude);
                });
            }
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                console.log(response);
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $state.transitionTo('consumer');
                    $location.path('/consumerID');
                } else {
                    $scope.error = "Dados de login inválidos!";
                    $scope.dataLoading = false;
                }
            });
        };
    }
]);
