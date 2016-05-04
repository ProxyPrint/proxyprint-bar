angular.module('ProxyPrint')
  .controller('ConsumerBudgetController', ['$scope', 'printShopListService', function($scope, printShopListService) {

    //FALTA DND INTEGRATION
    //FALTA COORDERNAR ISTO COM O FLOW DO PEDIDO

    $scope.selectedPrintShops = [];
    $scope.printshops = printShopListService.getPrintShops();

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
