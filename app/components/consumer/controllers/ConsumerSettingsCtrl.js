angular.module('ProxyPrint').controller('ConsumerSettingsCtrl', ['$scope', '$cookieStore', 'consumer', 'toasterService', 'consumerService', 'authenticationService', function ($scope, $cookieStore, consumer, toasterService, consumerService, authenticationService) {
  $scope.consumer = consumer.data.consumer;

  console.log($scope.consumer);

  $scope.email=$scope.consumer.email;
  $scope.name=$scope.consumer.name;
  $scope.username=$scope.consumer.username;
  $scope.password=$scope.consumer.password;
  $scope.newPassword=$scope.consumer.password;

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
      console.log($scope.consumer);
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

}]);
