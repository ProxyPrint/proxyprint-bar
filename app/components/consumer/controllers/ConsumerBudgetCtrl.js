angular.module('ProxyPrint').controller('ConsumerBudgetCtrl', ['$scope','$cookieStore', '$state', 'budgets', 'printShopListService', 'fileTransferService',
function($scope, $cookieStore, $state, budgets, printShopListService, fileTransferService) {

  $scope.budgets = budgets.data.budgets;
  // OK
  $scope.selectedPrintShops = printShopListService.getSelectedPrintShops();
  // OK but not in cookies
  $scope.submitedFiles = fileTransferService.getProcessedFiles().files;
  $scope.submitedFilesNames = Object.keys($scope.submitedFiles);

  for(var pshopID in $scope.budgets) {
    if(!isNaN($scope.budgets[pshopID])) $scope.selectedPrintShops[pshopID]['hasBudget'] = true;
    $scope.selectedPrintShops[pshopID]['budget'] = $scope.budgets[pshopID];
  }

}]);
