angular.module('Auth').controller('PrintShopLoginCtrl',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$state', '$cookieStore',
    function ($scope, $rootScope, $location, AuthenticationService, $state, $cookieStore) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
               console.log(response);
                if (response.success) {
                    // Verify role! and the change state!
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/printshopID');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

    }]);
