angular.module('Auth').controller('IntegrationLoginController', ['$scope', '$rootScope', '$location', 'authenticationService', '$state', '$cookieStore',
function($scope, $rootScope, $location, authenticationService, $state, $cookieStore) {
  // reset login status
  authenticationService.ClearCredentials();

  $scope.login = function() {
    $scope.dataLoading = true;
    authenticationService.Login($scope.username, $scope.password, function(response) {
      if (response.success) {
        console.log(response.user);

        // Consumer
        if(response.user.roles[0] == "ROLE_USER") {
          $cookieStore.put("consumerID", response.user.id);
          $cookieStore.put("consumerName", response.user.name);
          $cookieStore.put("consumerBalance", response.user.balance);
          if(response.externalURL) {
            $cookieStore.put("externalURL", response.externalURL);
          }
          authenticationService.SetCredentials($scope.username, $scope.password);
          $state.go('consumer.mainpage', {"consumerID":$scope.username});
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
