var app = angular.module('ProxyPrint');

app.controller('ConsultRequestCtrl', ['$scope', 'pendingPrintRequest', '$uibModal', 'pendingPrintRequestsService', function($scope, pendingPrintRequest, $uibModal, pendingPrintRequestsService) {

    $scope.request = pendingPrintRequest;

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
        pendingPrintRequestsService.acceptRequest($scope.request.id);
      });
    }

    $scope.openRejectModal = function(reply) {

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
        pendingPrintRequestsService.rejectRequest($scope.request.id);
      });
    }

    $scope.files = [
        {
            name : 'Slides 1',
            specs : {
                format : 'A4',
                sides : 'Frente',
                colors : 'Preto e branco',
                cover : 'Agrafar'
            }
        },{
            name : 'Slides 2',
            specs : {
                format : 'A3',
                sides : 'Frente e verso',
                colors : 'Preto e branco',
                cover : 'Agrafar'
            }
        },{
            name : 'Slides 3',
            specs : {
                format : 'A5',
                sides : 'Frente',
                colors : 'A cores',
                cover : 'Agrafar'
            }
        }
    ];

}]);

app.controller('PrintRequestModalController', ['$scope', '$uibModalInstance', 'text', function($scope, $uibModalInstance, text){

  $scope.text = text;

  $scope.performAction = function () {
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
