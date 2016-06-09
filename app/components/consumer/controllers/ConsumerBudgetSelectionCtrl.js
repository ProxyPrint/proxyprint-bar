angular.module('ProxyPrint').controller('ConsumerBudgetSelectionCtrl', ['$scope', '$cookieStore', '$state', 'budgets', 'printShopListService', 'fileTransferService', 'budgetService', 'backendURLService', 'usSpinnerService', '$uibModal',
  function($scope, $cookieStore, $state, budgets, printShopListService, fileTransferService, budgetService, backendURLService, usSpinnerService, $uibModal) {

    $scope.budgets = budgets.budgets;
    console.log($scope.budgets);
    $scope.printRequestID = budgets.printRequestID;
    $scope.selectedPrintShops = printShopListService.getSelectedPrintShops();
    var tmpFiles = fileTransferService.getProcessedFiles().files;
    $scope.submitedFiles = [];
    for(var fileName in tmpFiles) {
      var file = tmpFiles[fileName];
      file.name = fileName;
      $scope.submitedFiles.push(file);
    }
    console.log($scope.submitedFiles);
    // $scope.submitedFilesNames = Object.keys($scope.submitedFiles);

    $scope.amount = 0.0;
    $scope.selectedPrintShopName = "";
    //caldas muda esta cena para o teu gosto
    //basicamente se o externalURL tiver vazio quer dizer que nao ha tunel e
    //deve se aceder direto
    if (budgets.externalURL) {
      if (backendURLService.getBaseURL().match("localhost")) {
        $scope.payPalCallbackUrl = budgets.externalURL + "paypal/ipn/";
      } else {
        // $scope.payPalCallbackUrl = budgets.externalURL + backendURLService.getContextPath() + "paypal/ipn/";
        $scope.payPalCallbackUrl = budgets.externalURL + "paypal/ipn/";
      }
    } else {
      $scope.payPalCallbackUrl = backendURLService.getBaseURL() + "paypal/ipn/";
    }
    console.log($scope.payPalCallbackUrl);

    for (var pshopID in $scope.budgets) {
      if (!isNaN($scope.budgets[pshopID])) {
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
      if ($scope.theChosenOne !== null && $scope.theChosenOne > 0) {
        // Set amount for pay pal payment
        $scope.amount = parseFloat($scope.budgets[$scope.theChosenOne]).toFixed(2);
        // Finish the PayPal callback URL appending the printRequestID
        $scope.payPalCallbackUrl += $scope.printRequestID;
        $scope.selectedPrintShopName = $scope.selectedPrintShops[$scope.theChosenOne].name;
        console.log($scope.payPalCallbackUrl);

        $scope.submitParams = {
          printRequestID: $scope.printRequestID,
          printshopID: $scope.theChosenOne,
          budget: parseFloat($scope.budgets[$scope.theChosenOne]),
          paymentMethod: ""
        };
      } else {
        alert("Por favor escolha de entre uma das reprografias. Caso nenhuma satisfaça o pedido volte atrás e tente outras reprografias.");
      }
    };

    $scope.pay = function() {
      usSpinnerService.spin('consumer-spinner');
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
    };

  }
]);

app.controller('PaymentMethodSelectionCtrl', ['$scope', '$state', 'toasterService', '$uibModalInstance', 'text', 'amount', 'callbackURL', 'pshopName', 'submitParams', 'budgetService', 'usSpinnerService', '$cookieStore', function($scope, $state, toasterService, $uibModalInstance, text, amount, callbackURL, pshopName, submitParams, budgetService, usSpinnerService, $cookieStore) {

  console.log("callbackURL: "+callbackURL);
  $scope.text = text;
  $scope.amount = amount;
  $scope.payPalCallbackUrl = callbackURL;
  $scope.pshopName = pshopName;
  $scope.submitParams = submitParams;
  $scope.isMethodSelected = false;
  $scope.paymentMethodDisplayString = "";
  usSpinnerService.stop('consumer-spinner');

  $scope.chooseProxyPrint = function() {
    $scope.submitParams.paymentMethod = "PROXYPRINT_PAYMENT";
    $scope.paymentMethodDisplayString = "ProxyPrint";
    $scope.isMethodSelected = true;
  };

  $scope.choosePayPal = function() {
    $scope.submitParams.paymentMethod = "PAYPAL_PAYMENT";
    $scope.paymentMethodDisplayString = "serviço externo PayPal";
    $scope.isMethodSelected = true;
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.confirmPayment = function() {
    if ($scope.submitParams.paymentMethod === "PROXYPRINT_PAYMENT") {
      $scope.payViaProxyPrint();
    } else {
      $scope.payViaProxyPrint();
    }
  };

  $scope.payViaProxyPrint = function() {
    usSpinnerService.spin('consumer-spinner');
    budgetService.submitPrintRequest($scope.submitParams.printRequestID, $scope.submitParams).success(function(data) {
        console.log(data);
        if (data.success === true) {
          var newAmount = subtractMoney($cookieStore.get("consumerBalance"), $scope.amount);
          $cookieStore.put("consumerBalance", newAmount);
          console.log(newAmount);
          toasterService.notifySuccess("Pedido submetido com sucesso. Iremos notificá-lo assim que tudo estiver pronto. Obrigado!");
        } else {
          toasterService.notifyWarning("Infelizmente não possuí saldo suficiente para pagar o pedido.");
        }
        $state.go('consumer.mainpage', {}, {
          reload: true
        });
        $uibModalInstance.dismiss('cancel');
        usSpinnerService.stop('consumer-spinner');
      })
      .error(function(data) {
        console.log(data);
        toasterService.notifyError("Pedimos desculpa mas foi impossível de processar o seu pedido. Por favor tente mais tarde.");
        $state.go('consumer.mainpage', {}, {
          reload: true
        });
        $uibModalInstance.dismiss('cancel');
        usSpinnerService.stop('consumer-spinner');
      });
  };

  $scope.payViaPayPal = function() {
    usSpinnerService.spin('consumer-spinner');
    budgetService.submitPrintRequest($scope.submitParams.printRequestID, $scope.submitParams).success(function(data) {
        if (data.success === true) {
          toasterService.notifySuccess("Assim que efetuar o pagamento no PayPal iremos registar o seu pedido. Obrigado!");
        } else {
          toasterService.notifyWarning("Infelizmente não conseguimos processar o seu pedido.");
        }
        $state.go('consumer.mainpage', {}, {
          reload: true
        });
        $uibModalInstance.dismiss('cancel');
        usSpinnerService.stop('consumer-spinner');
      })
      .error(function(data) {
        toasterService.notifyError("Pedimos desculpa mas foi impossível de processar o seu pedido. Por favor tente mais tarde.");
        $state.go('consumer.mainpage', {}, {
          reload: true
        });
        $uibModalInstance.dismiss('cancel');
        usSpinnerService.stop('consumer-spinner');
      });
  };

  $scope.showPayPalConfirmButton = function() {
    return $scope.submitParams.paymentMethod === "PAYPAL_PAYMENT";
  };

  $scope.showProxyPrintConfirmButton = function() {
    return $scope.submitParams.paymentMethod === "PROXYPRINT_PAYMENT";
  };

  function subtractMoney(balance, amount) {
    amountParts = amount.split(".");
    ip = parseInt(amountParts[0]);
    fp = parseInt(amountParts[1]);
    balance.integerPart -= ip;
    tmp = balance.fractionalPart - fp;

    if (tmp <= 0) {
      while (tmp <= 0) {
        balance.integerPart--;
        balance.fractionalPart = tmp + 100;
        tmp += 100;
      }
    } else {
      balance.fractionalPart = tmp;
    }
    return balance;
  }

}]);
