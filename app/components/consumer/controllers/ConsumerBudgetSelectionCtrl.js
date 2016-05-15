angular.module('ProxyPrint').controller('ConsumerBudgetSelectionCtrl', ['$scope','$cookieStore', '$state', 'budgets', 'printShopListService', 'fileTransferService', 'budgetService',
function($scope, $cookieStore, $state, budgets, printShopListService, fileTransferService, budgetService) {

  $scope.budgets = budgets.budgets;
  $scope.printRequestID = budgets.printRequestID;
  $scope.selectedPrintShops = printShopListService.getSelectedPrintShops();
  $scope.submitedFiles = fileTransferService.getProcessedFiles().files;
  $scope.submitedFilesNames = Object.keys($scope.submitedFiles);

  for(var pshopID in $scope.budgets) {
    if(!isNaN($scope.budgets[pshopID])) {
      $scope.selectedPrintShops[pshopID]['hasBudget'] = true;
      $scope.selectedPrintShops[pshopID]['budget'] = parseFloat($scope.budgets[pshopID]).toFixed(2);
    } else {
      $scope.selectedPrintShops[pshopID]['budget'] = $scope.budgets[pshopID];
    }
  }

  $scope.isSomePShopSelected = false;

  $scope.finishPrintRequest = function() {
    console.log($scope.printRequestID);
    console.log($scope.theChosenOne);
    if($scope.theChosenOne!==null && $scope.theChosenOne > 0) {
      var submitParams = {printshopID: $scope.theChosenOne , budget: parseFloat($scope.budgets[$scope.theChosenOne])};
      budgetService.submitPrintRequest($scope.submitRequestSuccessCallback, $scope.submitRequestErrorCallback, $scope.printRequestID, submitParams);
    } else {
      alert("Por favor escolha de entre uma das reprografias. Caso nenhuma satisfaça o pedido volte atrás e tente outras reprografias.");
    }
  };

  $scope.submitRequestSuccessCallback = function(data) {
    alert("O seu pedido foi registado. Quando o pedido estiver pronto receberá uma notificação.");
    $state.go("consumer.mainpage", {reload: true});
  };

  $scope.submitRequestErrorCallback = function(data) {
    alert("Infelizmente não conseguimos registar o seu pedido. Por favor tente mais tarde");
    $state.go("consumer.mainpage", {reload: true});
  };

}]);