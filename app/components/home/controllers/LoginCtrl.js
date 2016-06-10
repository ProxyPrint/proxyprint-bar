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
          $cookieStore.put("printShopName", response.user.printShop.name);
          $state.go('manager.mainpage', {"username": $scope.username});
        }
        // PrintShop - Employee
        else if (response.user.roles[0] == "ROLE_EMPLOYEE") {
          authenticationService.SetCredentials($scope.username, $scope.password);
          $cookieStore.put("printShopName", response.user.printShop.name);
          $state.go('employee.pending', {"username": $scope.username});
        }
        // Consumer
        else if(response.user.roles[0] == "ROLE_USER") {
          $cookieStore.put("consumerID", response.user.id);
          $cookieStore.put("consumerName", response.user.name);
          $cookieStore.put("consumerBalance", response.user.balance);
          authenticationService.SetCredentials($scope.username, $scope.password);
          $state.go('consumer.mainpage', {"consumerID":$scope.username});
        }
        // Admin
        else if(response.user.roles[0] == "ROLE_ADMIN") {
          authenticationService.SetCredentials($scope.username, $scope.password);
          $cookieStore.put("platformBalance", response.user.balance);
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
