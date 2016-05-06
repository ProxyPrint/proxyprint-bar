angular.module('ProxyPrint')
.controller('ConsumerPrintShopsSelectionController', ['$scope', 'printShopListService', function($scope, printShopListService) {

  //FALTA DND INTEGRATION
  //FALTA COORDERNAR ISTO COM O FLOW DO PEDIDO

  $scope.selectedPrintShops = [];
  $scope.printshops = printShopListService.getPrintShops();

  // Distance slider
  $scope.distanceSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 20,
      showSelectionBar: true,
      translate: function(value) {
        return value + 'km';
      }
    }
  };

  $scope.addPrintShop = function() {
    if ($scope.selectedPrintShop) {
      console.log($scope.selectedPrintShop)
      $scope.selectedPrintShops.push($scope.selectedPrintShop);
      remove($scope.printshops, $scope.selectedPrintShop);
      console.log($scope.printshops.indexOf($scope.selectedPrintShop));
    }
  }

  function remove(arr, item) {
    for (var i = arr.length; i--;) {
      if (arr[i] === item) {
        arr.splice(i, 1);
      }
    }
  }
}]);
