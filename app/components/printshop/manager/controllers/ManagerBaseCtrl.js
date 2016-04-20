angular.module('ProxyPrint').controller('ManagerBaseCtrl', ['$scope',
function($scope) {

  $scope.manager = { name: "Joaquim Silva" };

  // For side bar highlights
  $scope.sidePanelActive = {
    main: "active",
    stats: "",
    employees: "",
    pricetable: ""
  };

  $scope.logout = function() {
    window.alert("Log out...");
    /*AuthenticationService.ClearCredentials();
    $state.go('printshop');*/
  };

}]);
