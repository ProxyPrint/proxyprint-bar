angular.module('Auth').controller('IntegrationRegisterController',
    ['$scope', '$rootScope', '$location', 'authenticationService','$state', '$cookieStore', 'requestHelperService',
    function ($scope, $rootScope, $location, authenticationService, $state, $cookieStore, requestHelperService) {
        // reset login status
        authenticationService.ClearCredentials();

        $scope.register = function () {
            $scope.dataLoading = true;
            authenticationService.Register($scope.name, $scope.email, $scope.username, $scope.password, function (response) {
                if (response.success) {
                    authenticationService.SetCredentials($scope.username, $scope.password);

                    requestHelperService.setSpecsStatus(true);

                    $state.go('consumer.iprintshopselection', {"consumerID":$scope.username});
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
