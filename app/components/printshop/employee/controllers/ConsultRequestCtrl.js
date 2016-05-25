var app = angular.module('ProxyPrint');

app.controller('ConsultRequestCtrl', ['$scope', 'pendingPrintRequest', '$uibModal', 'pendingPrintRequestsService', '$state', '$http', '$window', 'backendURLService',
function($scope, pendingPrintRequest, $uibModal, pendingPrintRequestsService, $state, $http, $window, backendURLService) {

    $scope.request = pendingPrintRequest.data.printrequest;
    $scope.isDataLoading = false;

    $scope.$watch('$scope.request.status', function() {
        if ($scope.request.status == 'PENDING') {
            $scope.message = "Pedido pendente";
        } else if ($scope.request.status == 'IN_PROGRESS') {
            $scope.message = "A ser atendido";
        } else if ($scope.request.status == 'FINISHED') {
            $scope.message = "Finalizado";
        }
    });

    $scope.download = function(documentID) {
        $http.get(backendURLService.getBaseURL() + "/documents/" + documentID, {
            responseType: 'arraybuffer'
        })
        .success(function(data) { // data is your url
            var file = new Blob([data], {
                type: 'application/pdf'
            });
            var fileURL = URL.createObjectURL(file);
            $window.open(fileURL);
        });
    };

    $scope.onCancelSuccessCallback = function(data) {
      $scope.isDataLoading = false;
      $state.go('employee.pending');
      $scope.openSuccessModal("O pedido foi cancelado com sucesso!");
    };

    $scope.onChangeStatusErroCallback = function(data) {
      $scope.isDataLoading = false;
      $scope.openSuccessModal("Ocorreu um erro a alterar o estado do pedido!");
    };

    $scope.openRejectModal = function(reply) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/components/printshop/employee/views/reject-modal.html',
            controller: 'PrintRequestCancelModalController',
            size: 'md'
        });

      modalInstance.result.then(function(motive) {
        $scope.isDataLoading = true;
        pendingPrintRequestsService.rejectRequest($scope.request.id, motive, $scope.onCancelSuccessCallback, $scope.onChangeStatusErroCallback);
      });
    };

    $scope.openAcceptModal = function(reply) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/components/printshop/employee/views/request-modal.html',
            controller: 'PrintRequestModalController',
            size: 'sm',
            resolve: {
                text: function() {
                    return reply;
                }
            }
        });

      modalInstance.result.then(function() {
        $scope.isDataLoading = true;
        pendingPrintRequestsService.acceptRequest($scope.request.id, $scope.onChangeStatusSuccessCallback, $scope.onChangeStatusErroCallback);
      });
    };

    // Callbacks to handle status change
    $scope.onChangeStatusSuccessCallback = function(data) {
      $scope.request.status = data.newStatus;
      //Falta fazer reload do estado.
      $state.reload();
      if ($scope.request.status == 'PENDING') {
        $scope.message = "Pedido pendente.";
      } else if ($scope.request.status == 'IN_PROGRESS') {
        $scope.message = "A ser atendido.";
      } else if ($scope.request.status == 'FINISHED') {
        $scope.message = "Finalizado";
      }
      $scope.isDataLoading = true;
      $scope.openSuccessModal("Pedido passará agora para o estado: " + $scope.message);
    };

    $scope.openSuccessModal = function(reply) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/components/printshop/employee/views/success-modal.html',
            controller: 'PrintRequestModalController',
            size: 'sm',
            resolve: {
                text: function() {
                    return reply;
                }
            }
        });
    };

    $scope.files = pendingPrintRequest.data.printrequest.documents;

}]);

app.controller('PrintRequestModalController', ['$scope', '$uibModalInstance', 'text',
function($scope, $uibModalInstance, text) {

    $scope.text = text;

    $scope.performAction = function() {
        $uibModalInstance.close();
    };

    $scope.closeModal = function() {
        $uibModalInstance.dismiss('cancel');
    };
}
]);

app.controller('PrintRequestCancelModalController', ['$scope', '$uibModalInstance',
function($scope, $uibModalInstance) {

    $scope.performAction = function() {
        $uibModalInstance.close($scope.motive);
    };

    $scope.closeModal = function() {
        $uibModalInstance.dismiss('cancel');
    };
}
]);
