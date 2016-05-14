angular.module('ProxyPrint')
.controller('ConsumerPrintShopsSelectionController', ['$scope', 'printShopListService', 'printshopsList', 'fileTransferService', '$cookieStore', 'budgetService', '$state', function($scope, printShopListService, printshopsList, fileTransferService, $cookieStore, budgetService, $state) {

  $scope.printshops = [];

  for (var dist in printshopsList.data.printshops) {
    var pshop = printshopsList.data.printshops[dist];
    pshop['distance'] = Math.round(dist * 100) / 100;
    $scope.printshops.push(pshop);
  }

  console.log($scope.printshops);

  $scope.selectedPrintShops = [];
  $scope.printShopsOptions = $scope.printshops;
  $scope.submitedFiles = $cookieStore.get("uploadedFilesNames");
  $scope.totalSelectedPrintShops = 0;
  $scope.maxSelectionAllowed = 5;
  $scope.showDistance = false;
  $scope.pshopNames = {};

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
    var choosenPShops = {};
    var choosenPShopsIDs = [];
    console.log("SELECTED!");
    console.log($scope.selectedPrintShops);
    for(var i=0; i < $scope.selectedPrintShops.length; i++) {
      console.log("INDEX: "+i);
      $scope.pshopNames[$scope.selectedPrintShops[i].id] = $scope.selectedPrintShops[i].name;
      choosenPShops[$scope.selectedPrintShops[i].id] = $scope.selectedPrintShops[i];
      choosenPShopsIDs.push($scope.selectedPrintShops[i].id);
    }
    console.log(choosenPShops);
    printShopListService.setSelectedPrintShops(choosenPShops);

    // REMOVE BELOW SHOULD GO TO ANOTHER CONTROLLER IN NEXT SPRINT
    // alert("Fazer orçamentos para reprografias: "+printShopListService.getSelectedPrintShops());

    var printRequest = fileTransferService.getProcessedFiles();
    if(printRequest!==null) {
      printRequest["printshops"] = choosenPShopsIDs;
      $cookieStore.put("printRequest", printRequest);
      // budgetService.getMeBudgetsForThis($scope.budgetSuccessCallback, $scope.budgetErrorCallback, printRequest);
      $state.go("consumer.budgetselection");
    }
  };

  /*---------------------------- Budget Callbacks ------------------------------*/
  $scope.budgetSuccessCallback = function(data) {
    console.log($scope.pshopNames);
    var budgets = data.budgets;
    var res = "";
    for(var pshopid in data.budgets) {
      res = res.concat("Printshop: "+$scope.pshopNames[pshopid]+" custa "+data.budgets[pshopid].toFixed(2)+" €.\n");
    }
    alert(res);
  };

  $scope.budgetErrorCallback = function(data) {
    console.log(data);
  };
  /*----------------------------------------------------------------------------*/

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
