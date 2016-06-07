angular.module('ProxyPrint').controller('SatisfiedRequestsCtrl', ['$scope', 'satisfiedPrintRequest', '$uibModal', 'satisfiedPrintRequestsService', '$state', 'paginationService', function($scope, satisfiedPrintRequest, $uibModal, satisfiedPrintRequestsService, $state, paginationService) {

  $scope.satisfiedRequests = satisfiedPrintRequest.data.satisfiedrequests;
  $scope.isDataLoading = false;

  $scope.paginationOn = true;
  $scope.pagination = paginationService.getNew(10);
  $scope.pagination.numPages = Math.ceil($scope.satisfiedRequests.length/$scope.pagination.perPage);

  $scope.liftRequest = function(requestID, reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/employee/views/request-modal.html',
      controller: 'LiftRequestModalController',
      size: 'sm',
      resolve: {
        text: function() {
          return reply;
        },
        id: function() {
          return requestID;
        }
      }
    });

    modalInstance.result.then(function(requestID) {
      $scope.isDataLoading = true;
      satisfiedPrintRequestsService.getUpRequest(requestID, $scope.onChangeStatusSuccessCallback, $scope.onChangeStatusErroCallback);
    });
  };

  $scope.onChangeStatusErroCallback = function(data, requestID) {
    $scope.isDataLoading = false;
    $scope.openSuccessModal("Ocorreu um erro a alterar o estado do pedido!");
  };

  $scope.onChangeStatusSuccessCallback = function(data, requestID) {
    $scope.isDataLoading = false;
    $state.reload();
    $scope.openSuccessModal("Pedido número " + requestID + " levantado com sucesso!", requestID);
  };

  $scope.filterRequests = function(client) {
    return (client.consumer.name.match($scope.requestSearch));
  };

  $scope.openSuccessModal = function(reply, requestID) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/employee/views/success-modal.html',
      controller: 'LiftRequestModalController',
      size: 'sm',
      resolve: {
        text: function() {
          return reply;
        },
        id: function() {
          return requestID;
        }
      }
    });
  };

}]);

app.controller('LiftRequestModalController', ['$scope', '$uibModalInstance', 'text', 'id', function($scope, $uibModalInstance, text, id) {

  $scope.text = text;
  $scope.requestID = id;

  $scope.performAction = function() {
    $uibModalInstance.close($scope.requestID);
  };

  $scope.closeModal = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]);
