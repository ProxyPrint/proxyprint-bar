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

                    var coords = null;
                    $scope.isGeoLocationActive = false;
                    if(navigator.geolocation){
                      navigator.geolocation.getCurrentPosition(function(position) {
                        coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                        $cookieStore.put('coords', coords);
                        $scope.isGeoLocationActive = true;
                      });
                    }
                    if(coords===null) {
                      // Default coords University of Minho
                      coords = {latitude:41.560501, longitude:-8.397250};
                      $cookieStore.put('coords', coords);
                    }

                    $state.go('consumer.iprintshopselection', {"consumerID":$scope.username});
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
