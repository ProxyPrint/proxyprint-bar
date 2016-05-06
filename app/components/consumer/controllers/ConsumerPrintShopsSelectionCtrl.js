angular.module('ProxyPrint')
.controller('ConsumerPrintShopsSelectionController', ['$scope', 'printShopListService', 'printshopsList', function($scope, printShopListService, printshopsList) {

  //FALTA DND INTEGRATION
  //FALTA COORDERNAR ISTO COM O FLOW DO PEDIDO

  $scope.selectedPrintShops = [];

  // $scope.printshops = printShopListService.getPrintShops();
  // console.log(printShopListService.getPrintShops());

  console.log(printshopsList);
  $scope.printshops = printshopsList;
  $scope.totalSelectedPShops = 0;
  $scope.maxSelectionAllowed = 5;

  // Distance slider
  $scope.distanceSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 120,
      showSelectionBar: true,
      translate: function(value) {
        return value + 'km';
      }
    }
  };

  $scope.addPrintShop = function() {
    if ($scope.selectedPrintShop && $scope.totalSelectedPShops < 5) {
      console.log($scope.selectedPrintShop)
      $scope.selectedPrintShops.push($scope.selectedPrintShop);
      remove($scope.printshops, $scope.selectedPrintShop);
      console.log($scope.printshops.indexOf($scope.selectedPrintShop));
      $scope.totalSelectedPShops++;
    }
  }

  $scope.formatPrinShopForOption = function(pshop) {
    return pshop.name + '  (' + pshop.distance + 'km)';
  };

  function remove(arr, item) {
    for (var i = arr.length; i--;) {
      if (arr[i] === item) {
        arr.splice(i, 1);
      }
    }
  }
}]);
