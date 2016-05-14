angular.module('ProxyPrint').controller('ConsumerBudgetCtrl', ['$scope','$cookieStore', '$state', 'budgets', 'printShopListService', 'fileTransferService', 'budgetService',
function($scope, $cookieStore, $state, budgets, printShopListService, fileTransferService, budgetService) {

  $scope.budgets = budgets.data.budgets;
  $scope.printRequestID = budgets.data.printRequestID;
  // OK
  $scope.selectedPrintShops = printShopListService.getSelectedPrintShops();
  // OK but not in cookies
  $scope.submitedFiles = fileTransferService.getProcessedFiles().files;
  $scope.submitedFilesNames = Object.keys($scope.submitedFiles);

  for(var pshopID in $scope.budgets) {
    if(!isNaN($scope.budgets[pshopID])) $scope.selectedPrintShops[pshopID]['hasBudget'] = true;
    $scope.selectedPrintShops[pshopID]['budget'] = $scope.budgets[pshopID];
  }

  $scope.finishPrintRequest = function(a) {
    console.log($scope.printRequestID);
    var submitParams = {printshopID: $scope.theChosenOne , budget: parseFloat($scope.budgets[$scope.theChosenOne])};
    budgetService.submitPrintRequest($scope.submitRequestSuccessCallback, $scope.submitRequestErrorCallback, $scope.printRequestID, submitParams);
  };

  $scope.submitRequestSuccessCallback = function(data) {
    alert("O seu pedido foi registado. Quando o pedido estiver pronto receberá uma notificação.");
    $state.go("consumer.mainpage");
  };

  $scope.submitRequestErrorCallback = function(data) {
    alert("Infelizmente não conseguimos registar o seu pedido. Por favor tente mais tarde");
    $state.go("consumer.mainpage");
  };

}]);
