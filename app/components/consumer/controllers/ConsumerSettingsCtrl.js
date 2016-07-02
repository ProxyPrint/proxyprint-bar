angular.module('ProxyPrint').controller('ConsumerSettingsCtrl', ['$scope', '$cookieStore', 'consumer', 'toasterService', 'consumerService', 'authenticationService', 'backendURLService', '$uibModal', function ($scope, $cookieStore, consumer, toasterService, consumerService, authenticationService, backendURLService, $uibModal) {
  $scope.consumer = consumer.data.consumer;

  // console.log($scope.consumer);

  $scope.email=$scope.consumer.email;
  $scope.name=$scope.consumer.name;
  $scope.username=$scope.consumer.username;
  $scope.password=$scope.consumer.password;
  $scope.newPassword=$scope.consumer.password;

  $scope.callbackURL = backendURLService.getBaseURL();
  if($cookieStore.get("externalURL")) {
    $scope.callbackURL = $cookieStore.get("externalURL");
  }
  $scope.callbackURL += "paypal/ipn/consumer/"+$scope.consumer.id;
  // console.log($scope.callbackURL);

  $scope.consumerHasChanged = function() {
    return ($scope.email===$scope.consumer.email && $scope.name===$scope.consumer.name && $scope.username===$scope.consumer.username && $scope.password===$scope.consumer.password && $scope.password===$scope.newPassword);
  };

  $scope.updateConsumer = function() {
    if($scope.password!==$scope.newPassword) {
      toasterService.notifyWarning("Por favor certifica-se que confirma a password corretamente.");
    } else {
      $scope.consumer.email=$scope.email;
      $scope.consumer.name=$scope.name;
      $scope.consumer.username=$scope.username;
      $scope.consumer.password=$scope.newPassword;
      // console.log($scope.consumer);
      consumerService.updateConsumer($scope.consumer).success(function(data) {
        if(data.success) {
          $cookieStore.put("consumerName", $scope.consumer.name);
          authenticationService.ClearCredentials();
          authenticationService.SetCredentials($scope.consumer.username, $scope.consumer.password);
          toasterService.notifySuccess("Os seus dados foram atualizados com sucesso");
        }
      });
    }
  };

  $scope.passwordType = "password";
  $scope.newPasswordType = "password";
  $scope.changePasswordType = function(arg) {
    if(arg===0) {
      if($scope.passwordType==="password") {
        $scope.passwordType = "text";
      } else {
        $scope.passwordType = "password";
      }
    } else {
      if($scope.newPasswordType==="password") {
        $scope.newPasswordType = "text";
      } else {
        $scope.newPasswordType = "password";
      }
    }
  };

  $scope.amount = 1;
  $scope.loadUpMoney = function() {
    if($scope.amount) {
      $scope.openPaymentMethodSelectionModal("Tem a certeza que pretende confirmar o carregamento via PayPal?", $scope.amount, $scope.callbackURL);
    } else {
      toasterService.notifyWarning("Por favor introduza uma quantia válida.");
    }
  };

  $scope.openPaymentMethodSelectionModal = function(text, amount, callbackURL) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/consumer/views/consumer-confirm-load-money-modal.html',
      controller: 'PayPalLoadUpConfirmationCtrl',
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
        }
      }
    });
  };

}]);

/*Controller for payment confirmation modal*/
app.controller('PayPalLoadUpConfirmationCtrl', ['$scope', '$state', 'toasterService', '$uibModalInstance', 'text', 'amount', 'callbackURL', '$cookieStore', function($scope, $state, toasterService, $uibModalInstance, text, amount, callbackURL, $cookieStore) {

  // console.log("callbackURL: "+callbackURL);
  $scope.text = text;
  $scope.amount = amount;
  $scope.payPalCallbackUrl = callbackURL;

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.confirmPayment = function() {
    toasterService.notifySuccess("Assim que efetuar o pagamento no PayPal iremos atualizar o seu saldo. Obrigado!");
    $uibModalInstance.dismiss('cancel');
    $state.go('consumer.mainpage', {}, {
      reload: true
    });
  };

}]);
