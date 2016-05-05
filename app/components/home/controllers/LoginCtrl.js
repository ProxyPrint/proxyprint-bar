angular.module('Auth').controller('LoginController', ['$scope', '$rootScope', '$location', 'authenticationService', '$state', '$cookieStore',
function($scope, $rootScope, $location, authenticationService, $state, $cookieStore) {
  // reset login status
  authenticationService.ClearCredentials();

  $scope.login = function() {
    $scope.dataLoading = true;
    authenticationService.Login($scope.username, $scope.password, function(response) {
      if (response.success) {
        console.log(response.user);
        // PrintShop - Manager
        if(response.user.roles[0] == "ROLE_MANAGER") {
          authenticationService.SetCredentials($scope.username, $scope.password);
          $cookieStore.put("printShopID", response.user.printShop['id']);
          $state.go('manager.stats', {"username": $scope.username});
        }
        // PrintShop - Employee
        else if (response.user.roles[0] == "ROLE_EMPLOYEE") {
          AuthenticationService.SetCredentials($scope.username, $scope.password);
          $state.go('employee.pending', {"username": $scope.username});
        }
        // Consumer
        else if(response.user.roles[0] == "ROLE_USER") {
          $cookieStore.put("consumerID", response.user.id);
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              $rootScope.position = position;
              console.log($rootScope.position.coords.latitude);
              console.log($rootScope.position.coords.longitude);
            });
          }

          authenticationService.SetCredentials($scope.username, $scope.password);
          $state.go('consumer', {"consumerID":$scope.username});
        }
        // Admin
        else if(response.user.roles[0] == "ROLE_ADMIN") {
          authenticationService.SetCredentials($scope.username, $scope.password);
          $state.go('admin.requests', {"username": $scope.username});
          return;
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