angular.module('ProxyPrint').controller('ConsumerBudgetSelectionCtrl', ['$scope','$cookieStore', '$state', 'budgets', 'printShopListService', 'fileTransferService', 'budgetService', 'backendURLService', 'permission',
function($scope, $cookieStore, $state, budgets, printShopListService, fileTransferService, budgetService, backendURLService, permission) {

  $scope.budgets = budgets.budgets;
  $scope.printRequestID = budgets.printRequestID;
  $scope.selectedPrintShops = printShopListService.getSelectedPrintShops();
  $scope.submitedFiles = fileTransferService.getProcessedFiles().files;
  $scope.submitedFilesNames = Object.keys($scope.submitedFiles);
  console.log(permission);

  $scope.amount = 0.0;

  /*---------------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------------*/
  // Use ngrok to create tunneling for testing with PayPal SandBox in local environment
  // $scope.payPalCallbackUrl = "http://80133cec.ngrok.io/paypal/ipn/";
  // PRODUCTION
  $scope.payPalCallbackUrl = backendURLService.getBaseURL();
  /*---------------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------------*/

  for(var pshopID in $scope.budgets) {
    if(!isNaN($scope.budgets[pshopID])) {
      $scope.selectedPrintShops[pshopID].hasBudget = true;
      $scope.selectedPrintShops[pshopID].budget = parseFloat($scope.budgets[pshopID]).toFixed(2);
    } else {
      $scope.selectedPrintShops[pshopID].budget = $scope.budgets[pshopID];
    }
  }

  $scope.isSomePShopSelected = false;

  $scope.finishPrintRequest = function() {
    console.log($scope.printRequestID);
    console.log($scope.theChosenOne);
    if($scope.theChosenOne!==null && $scope.theChosenOne > 0) {
      var submitParams = {printshopID: $scope.theChosenOne , budget: parseFloat($scope.budgets[$scope.theChosenOne])};

      // Set amount for pay pal payment
      $scope.amount = parseFloat($scope.budgets[$scope.theChosenOne]).toFixed(2);
      // Finish the PayPal callback URL appending the printRequestID
      $scope.payPalCallbackUrl += $scope.printRequestID;

      // Send request to server
      budgetService.submitPrintRequest($scope.submitRequestSuccessCallback, $scope.submitRequestErrorCallback, $scope.printRequestID, submitParams);
    } else {
      alert("Por favor escolha de entre uma das reprografias. Caso nenhuma satisfaça o pedido volte atrás e tente outras reprografias.");
    }
  };

  $scope.submitRequestSuccessCallback = function(data) {
    alert("O seu pedido foi registado e aguarda pagamento. Após efetuar o pagamento, quando o pedido estiver pronto receberá uma notificação.");
    // $state.go("consumer.mainpage", {reload: true});
  };

  $scope.submitRequestErrorCallback = function(data) {
    alert("Infelizmente não conseguimos registar o seu pedido. Por favor tente mais tarde");
    // $state.go("consumer.mainpage", {reload: true});
  };

  $scope.goBackToConsumerLandingPage = function() {
    $state.go('consumer.mainpage');
  };

}]);
