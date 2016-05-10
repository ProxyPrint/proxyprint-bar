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
          $cookieStore.put("printShopID", response.user.printShop.id);
          $state.go('manager.stats', {"username": $scope.username});
        }
        // PrintShop - Employee
        else if (response.user.roles[0] == "ROLE_EMPLOYEE") {
          authenticationService.SetCredentials($scope.username, $scope.password);
          $state.go('employee.pending', {"username": $scope.username});
        }
        // Consumer
        else if(response.user.roles[0] == "ROLE_USER") {
          $cookieStore.put("consumerID", response.user.id);
          authenticationService.SetCredentials($scope.username, $scope.password);
          $state.go('consumer.mainpage', {"consumerID":$scope.username});
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
