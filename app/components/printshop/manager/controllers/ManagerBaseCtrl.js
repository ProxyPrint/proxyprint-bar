angular.module('ProxyPrint').controller('ManagerBaseCtrl', ['$scope', '$state', 'AuthenticationService',
function($scope, $state, AuthenticationService) {

  $scope.manager = { name: "Joaquim Silva" };

  // For side bar highlights
  $scope.sidePanelActive = {
    main: "active",
    stats: "",
    employees: "",
    pricetable: ""
  };

  $scope.logout = function() {
    AuthenticationService.ClearCredentials();
    $state.go('printshop');
  };

}]);
