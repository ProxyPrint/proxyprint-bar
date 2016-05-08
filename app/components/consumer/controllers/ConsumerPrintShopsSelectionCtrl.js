angular.module('ProxyPrint')
.controller('ConsumerPrintShopsSelectionController', ['$scope', 'printShopListService', 'printshopsList', 'fileTransferService', '$cookieStore', function($scope, printShopListService, printshopsList, fileTransferService, $cookieStore) {

  $scope.printshops = [];

  for (var dist in printshopsList.data.printshops) {
    console.log(printshopsList.data.printshops[dist]);
    var pshop = printshopsList.data.printshops[dist];
    pshop['distance'] = Math.round(dist * 100) / 100;
    $scope.printshops.push(pshop);
  }

  $scope.selectedPrintShops = [];
  $scope.printShopsOptions = $scope.printshops;
  $scope.submitedFiles = $cookieStore.get("uploadedFilesNames");
  $scope.totalSelectedPrintShops = 0;
  $scope.maxSelectionAllowed = 5;
  $scope.showDistance = false;

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

  $scope.proceedRequest = function() {
    var ids = [];
    for(var i in $scope.selectedPrintShops) {
      ids.push($scope.selectedPrintShops[i].id);
    }
    printShopListService.setSelectedPrintShopsIDs(ids);

    // REMOVE BELOW CODE IN NEXT SPRINT
    alert("Fazer orçamentos para reprografias: "+printShopListService.getSelectedPrintShopsIDs());
  }

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
