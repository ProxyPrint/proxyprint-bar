angular.module('ProxyPrint')
.controller('IntegrationPrintShopsSelectionController',
['$scope', 'printShopListService', 'printshopsList', 'documentsService', '$cookieStore', 'integrationBudgetService', '$state', 'usSpinnerService', 'requestHelperService', 'toasterService',
function($scope, printShopListService, printshopsList, documentsService, $cookieStore, integrationBudgetService, $state, usSpinnerService, requestHelperService, toasterService) {

    $scope.printshops = [];

    for (var dist in printshopsList.data.printshops) {
        var pshop = printshopsList.data.printshops[dist];
        pshop.distance = Math.round(dist * 100) / 100;
        $scope.printshops.push(pshop);
    }

    $scope.selectedPrintShops = [];
    $scope.printShopsOptions = $scope.printshops;

    $scope.files = documentsService.getProcessedFiles();

    $scope.totalSelectedPrintShops = 0;
    $scope.maxSelectionAllowed = 5;
    $scope.showDistance = false;
    $scope.pshopNames = {};
    usSpinnerService.stop('consumer-spinner');

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
        if(pshop) {
            if($scope.isGeoLocationActive) {
                return pshop.name + '  (' + pshop.distance + 'km)';
            } else {
                return pshop.name;
            }
        }
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

        for(var i=0; i < $scope.selectedPrintShops.length; i++) {
            $scope.pshopNames[$scope.selectedPrintShops[i].id] = $scope.selectedPrintShops[i].name;
            choosenPShops[$scope.selectedPrintShops[i].id] = $scope.selectedPrintShops[i];
            choosenPShopsIDs.push($scope.selectedPrintShops[i].id);
        }

        printShopListService.setSelectedPrintShops(choosenPShops);

        usSpinnerService.spin('consumer-spinner');
        integrationBudgetService.getMeBudgetsForThis($scope.budgetSuccessCallback, $scope.budgetErrorCallback, choosenPShopsIDs, 20);
    };

    $scope.budgetSuccessCallback = function() {
        requestHelperService.setSelectedPrintShopsStatus(true);
        $state.go("consumer.budgetselection");
    };

    $scope.budgetErrorCallback = function(data) {
        usSpinnerService.stop('consumer-spinner');
        toasterService.notifyWarning("Os orçamentos não puderam se efetuados. Por favor tente mais tarde.");
        console.log(data);
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
