angular.module('Auth').controller('IntegrationLoginController', ['$scope', '$rootScope', '$location', 'authenticationService', '$state', '$cookieStore', 'documents', 'documentsService', 'idrequest', 'requestHelperService',
function($scope, $rootScope, $location, authenticationService, $state, $cookieStore, documents, documentsService, idrequest, requestHelperService) {
    // reset login status
    //console.log("Sucess1");
    authenticationService.ClearCredentials();

    $scope.files = documents.data.documents;

    $cookieStore.put("requestid", idrequest);

    $scope.login = function() {
        $scope.dataLoading = true;
        authenticationService.Login($scope.username, $scope.password, function(response) {
            if (response.success) {
                if(response.user.roles[0] == "ROLE_USER") {
                    $cookieStore.put("consumerID", response.user.id);
                    $cookieStore.put("consumerName", response.user.name);
                    $cookieStore.put("consumerBalance", response.user.balance);

                    if(response.externalURL) {
                        $cookieStore.put("externalURL", response.externalURL);
                    }

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
                    $scope.error = "Dados de login inválidos!";
                    $scope.dataLoading = false;
                }
            }
            else {
                $scope.error = "Dados de login inválidos!";
                $scope.dataLoading = false;
            }
        });
    };
}
]);
