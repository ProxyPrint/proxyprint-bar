angular.module('ProxyPrint')
.controller('ConsumerPrintShopsSelectionController', ['$scope', 'printShopListService', 'printshopsList', 'fileTransferService', '$cookieStore', function($scope, printShopListService, printshopsList, fileTransferService, $cookieStore) {

  // COMMIT 2

  // Distance slider
  $scope.distanceSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 120,
      showSelectionBar: true,
      translate: function(value) {
        // Filter options
        if($scope.showDistance === true){
          $scope.printShopsOptions = $scope.printshops.filter(function(pshop) { return pshop.distance <= value; });
        }
        return value + 'km';
      }
    }
  };

  $scope.addPrintShop = function(pshop) {
    if (pshop && $scope.totalSelectedPrintShops < 5) {
      $scope.selectedPrintShops.push(pshop);
      remove($scope.printshops, pshop);
      $scope.totalSelectedPrintShops++;
    }
  };

  $scope.formatPrinShopForOption = function(pshop) {
    if(pshop) return pshop.name + '  (' + pshop.distance + 'km)';
  };

  $scope.removePrintShop = function(index) {
    $scope.printshops.push($scope.selectedPrintShops[index]);
    $scope.selectedPrintShops.splice(index, 1);
    $scope.totalSelectedPrintShops--;
    $scope.printshops.sort(comparePrintShopsByDistance);
  };

  function remove(arr, item) {
    for (var i = arr.length; i--;) {
      if (arr[i] === item) {
        arr.splice(i, 1);
      }
    }
  }

  function comparePrintShopsByDistance(a,b) {
    if (a.distance < b.distance) return -1;
    else if (a.distance > b.distance) return 1;
    else return 0;
  }

}]);
