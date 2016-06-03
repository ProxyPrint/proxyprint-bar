angular.module('ProxyPrint').controller('ConsumerBudgetSelectionCtrl', ['$scope','$cookieStore', '$state', 'budgets', 'printShopListService', 'fileTransferService', 'budgetService', 'backendURLService', '$uibModal', 'usSpinnerService',
function($scope, $cookieStore, $state, budgets, printShopListService, fileTransferService, budgetService, backendURLService, $uibModal, usSpinnerService) {

  $scope.budgets = budgets.budgets;
  console.log($scope.budgets);
  $scope.printRequestID = budgets.printRequestID;
  $scope.selectedPrintShops = printShopListService.getSelectedPrintShops();
  $scope.submitedFiles = fileTransferService.getProcessedFiles().files;
  $scope.submitedFilesNames = Object.keys($scope.submitedFiles);

  $scope.amount = 0.0;
  $scope.selectedPrintShopName = "";
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
  usSpinnerService.stop('consumer-spinner');
  $scope.isSomePShopSelected = false;

  $scope.finishPrintRequest = function() {
    console.log($scope.printRequestID);
    console.log($scope.theChosenOne);
    if($scope.theChosenOne!==null && $scope.theChosenOne > 0) {
      // Set amount for pay pal payment
      $scope.amount = parseFloat($scope.budgets[$scope.theChosenOne]).toFixed(2);
      // Finish the PayPal callback URL appending the printRequestID
      $scope.payPalCallbackUrl += $scope.printRequestID;
      $scope.selectedPrintShopName = $scope.selectedPrintShops[$scope.theChosenOne].name;
      console.log($scope.payPalCallbackUrl);

      $scope.submitParams = {printRequestID: $scope.printRequestID, printshopID: $scope.theChosenOne , budget: parseFloat($scope.budgets[$scope.theChosenOne]), paymentMethod: ""};
    } else {
      alert("Por favor escolha de entre uma das reprografias. Caso nenhuma satisfaça o pedido volte atrás e tente outras reprografias.");
    }
  };

  $scope.pay = function() {
    // ... pay
    $scope.openPaymentMethodSelectionModal("Escolha o método de pagamento", $scope.amount, $scope.payPalCallbackUrl, $scope.selectedPrintShopName, $scope.submitParams);
  };

  $scope.openPaymentMethodSelectionModal = function(text, amount, callbackURL, pshopName, submitParams) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/consumer/views/consumer-payment-method-selection.html',
      controller: 'PaymentMethodSelectionCtrl',
      size: 'sm',
      resolve: {
        text: function() {
          return text;
        },
        amount: function() {
          return amount;
        },
        callbackURL: function() {
          return callbackURL;
        },
        pshopName: function() {
          return pshopName;
        },
        submitParams: function() {
          return submitParams;
        }
      }
    });
    modalInstance.result.then(function() {
      //...
    });
  };

}]);

app.controller('PaymentMethodSelectionCtrl', ['$scope', '$state', 'toasterService', '$uibModalInstance', 'text', 'amount', 'callbackURL', 'pshopName', 'submitParams', 'budgetService', function($scope, $state, toasterService, $uibModalInstance, text, amount, callbackURL, pshopName, submitParams, budgetService) {

  $scope.text = text;
  $scope.amount = amount;
  $scope.payPalCallbackUrl = callbackURL;
  $scope.pshopName = pshopName;
  $scope.submitParams = submitParams;

  $scope.chooseProxyPrint = function () {
    $scope.submitParams.paymentMethod = "PROXYPRINT_PAYMENT";
    budgetService.submitPrintRequest($scope.submitParams.printRequestID, $scope.submitParams).success(function(data) {
      console.log(data);
      if(data.success===true) {
        toasterService.notifySuccess("Pedido submetido com sucesso. Iremos notificá-lo assim que tudo estiver pronto. Obrigado!");
      } else {
        toasterService.notifyWarning("Infelizmente não possuí saldo suficiente para pagar o pedido.");
      }
      $state.go('consumer.mainpage');
      $uibModalInstance.dismiss('cancel');
    })
    .error(function(data) {
      console.log(data);
      toasterService.notifyError("Pedimos desculpa mas foi impossível de processar o seu pedido. Por favor tente mais tarde.");
      $state.go('consumer.mainpage');
      $uibModalInstance.dismiss('cancel');
    });
  };

  $scope.choosePayPal = function () {
    $scope.submitParams.paymentMethod = "PAYPAL_PAYMENT";
    budgetService.submitPrintRequest($scope.submitParams.printRequestID, $scope.submitParams).success(function(data) {
      if(data.success===true) {
        toasterService.notifySuccess("Assim que efetuar o pagamento no PayPal iremos registar o seu pedido. Obrigado!");
      } else {
        toasterService.notifyWarning("Infelizmente não conseguimos processar o seu pedido.");
      }
      $state.go('consumer.mainpage');
      $uibModalInstance.dismiss('cancel');
    })
    .error(function(data) {
      toasterService.notifyError("Pedimos desculpa mas foi impossível de processar o seu pedido. Por favor tente mais tarde.");
      $state.go('consumer.mainpage');
      $uibModalInstance.dismiss('cancel');
    });
  };

}]);
