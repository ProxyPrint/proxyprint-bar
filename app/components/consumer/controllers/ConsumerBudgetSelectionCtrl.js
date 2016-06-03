angular.module('ProxyPrint').controller('ConsumerBudgetSelectionCtrl', ['$scope','$cookieStore', '$state', 'budgets', 'printShopListService', 'fileTransferService', 'budgetService', 'backendURLService', '$uibModal',
function($scope, $cookieStore, $state, budgets, printShopListService, fileTransferService, budgetService, backendURLService, $uibModal) {

  $scope.budgets = budgets.budgets;
  console.log($scope.budgets);
  $scope.printRequestID = budgets.printRequestID;
  $scope.selectedPrintShops = printShopListService.getSelectedPrintShops();
  $scope.submitedFiles = fileTransferService.getProcessedFiles().files;
  $scope.submitedFilesNames = Object.keys($scope.submitedFiles);

  $scope.amount = 0.0;
  // $scope.payPalCallbackUrl = backendURLService.getTunnelURL()+"paypal/ipn/";
  if(backendURLService.getBaseURL().match("localhost")) {
    $scope.payPalCallbackUrl = budgets.externalURL+"paypal/ipn/";
  } else {
    $scope.payPalCallbackUrl = budgets.externalURL+backendURLService.getContextPath()+"paypal/ipn/";
  }
  console.log($scope.payPalCallbackUrl);

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
      console.log($scope.payPalCallbackUrl);

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
    // Open modal for choosing payment method
    $state.go('consumer.mainpage');
  };

  $scope.pay = function() {
    // ... pay
    $scope.openPaymentMethodSelectionModal("Escolha o método de pagamento", $scope.amount, $scope.payPalCallbackUrl);
  };

  $scope.openPaymentMethodSelectionModal = function(text,amount,callbackURL) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/consumer/views/consumer-payment-method-selection.html',
      controller: 'PaymentMethodSelectionCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return text;
        },
        amount: function() {
          return amount;
        },
        callbackURL: function() {
          return callbackURL;
        }
      }
    });
    modalInstance.result.then(function(index) {
      //...
    });
  };

}]);

app.controller('PaymentMethodSelectionCtrl', ['$scope', '$uibModalInstance', 'text', 'amount', 'callbackURL', function($scope, $uibModalInstance, text, amount, callbackURL) {

  $scope.text = text;
  $scope.amount = amount;
  $scope.payPalCallbackUrl = callbackURL;

  $scope.addNewEntry = function () {
    //...
  };

  $scope.closeModal = function () {
    //...
  };

}]);
