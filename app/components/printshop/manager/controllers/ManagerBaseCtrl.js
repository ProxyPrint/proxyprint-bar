angular.module('ProxyPrint').controller('ManagerBaseCtrl', ['$scope', '$state', 'authenticationService',
function($scope, $state, authenticationService) {

  $scope.manager = { name: "Joaquim Silva" };

  // For side bar highlights
  $scope.sidePanelActive = {
    main: "active",
    stats: "",
    employees: "",
    pricetable: ""
  };

  $scope.logout = function() {
    authenticationService.ClearCredentials();
    $state.go('printshop');
  };

}]);
