var app = angular.module('ProxyPrint');

app.controller('ConsultRequestCtrl', ['$scope', 'pendingPrintRequest', '$uibModal', 'pendingPrintRequestsService', '$state', '$http', function($scope, pendingPrintRequest, $uibModal, pendingPrintRequestsService, $state, $http) {

    $scope.request = pendingPrintRequest.data.printrequest;
    console.log($scope.request);

    $scope.$watch( '$scope.request.status', function(){
        if ($scope.request.status == 'PENDING') {
            $scope.message = "Pedido pendente.";
        } else if ($scope.request.status == 'IN_PROGRESS') {
            $scope.message = "A ser atendido.";
        } else if ($scope.request.status == 'FINISHED') {
            $scope.message = "Finalizado";
        }
    });

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
            pendingPrintRequestsService.acceptRequest($scope.request.id, $scope.onChangeStatusSuccessCallback, $scope.onChangeStatusErroCallback);
        });
    };

    // Callbacks to handle status change
    $scope.onChangeStatusSuccessCallback = function(data) {
      console.log(data);
      $scope.request.status = data.newStatus;
      alert("Pedido passará agora a "+$scope.request.status);
      //Falta fazer reload do estado.
      $state.reload();
    };

    $scope.onChangeStatusErroCallback = function(data) {
      alert("error"); // handle error...
    };



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
            $state.go('employee.pending');
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

app.controller('PrintRequestModalController', ['$scope', '$uibModalInstance', 'text',
function($scope, $uibModalInstance, text){

    $scope.text = text;

    $scope.performAction = function () {
        $uibModalInstance.close();
    };

    $scope.closeModal = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
