angular.module('ProxyPrint').controller('ManagerBaseCtrl', ['$scope', '$state', 'authenticationService', '$cookieStore',
function($scope, $state, authenticationService, $cookieStore) {

  $scope.manager = $cookieStore.get('globals').currentUser;

  $scope.logout = function() {
    authenticationService.ClearCredentials();
    $state.go('printshop');
  };

  // Navigation highlight
  $scope.navigation = { stats: "active", pricetable: "", employees: "" };
  $scope.navigate = function(where) {
    for(var i in $scope.navigation){ $scope.navigation[i] = ""; }
    $scope.navigation[where] = "active";
  };

}]);
