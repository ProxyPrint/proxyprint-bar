angular.module('ProxyPrint').controller('ManagerPriceTableCtrl', ['$scope',
function($scope) {

  $scope.priceTable = {
    "BW": [
      {infLim: "1", supLim: "20", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
      {infLim: "21", supLim: "30", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
      {infLim: "31", supLim: "100", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20}
    ],
    "COLOR": [
      {infLim: "1", supLim: "20", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
      {infLim: "21", supLim: "30", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
      {infLim: "31", supLim: "100", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20}
    ]
  };

  $scope.isStaplingFree = false;

}]);
