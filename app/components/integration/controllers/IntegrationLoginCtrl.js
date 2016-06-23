angular.module('Auth').controller('IntegrationLoginController', ['$scope', '$rootScope', '$location', 'authenticationService', '$state', '$cookieStore', 'documents', 'documentsService', 'idrequest', 'requestHelperService',
function($scope, $rootScope, $location, authenticationService, $state, $cookieStore, documents, documentsService, idrequest, requestHelperService) {
    // reset login status
    authenticationService.ClearCredentials();

    $scope.files = documents.data.documents;

    $scope.login = function() {
        $scope.dataLoading = true;
        authenticationService.Login($scope.username, $scope.password, function(response) {
            if (response.success) {
                if(response.user.roles[0] == "ROLE_USER") {
                    $cookieStore.put("consumerID", response.user.id);
                    $cookieStore.put("consumerName", response.user.name);
                    $cookieStore.put("consumerBalance", response.user.balance);
                    $cookieStore.put("requestid", idrequest);
                    if(response.externalURL) {
                        $cookieStore.put("externalURL", response.externalURL);
                    }
                    authenticationService.SetCredentials($scope.username, $scope.password);

                    requestHelperService.setSpecsStatus(true);

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
