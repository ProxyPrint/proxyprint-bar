var app = angular.module('ProxyPrint');

app.controller('ConsultRequestCtrl', ['$scope', 'pendingPrintRequest', '$uibModal', 'pendingPrintRequestsService', '$state', '$http', function($scope, pendingPrintRequest, $uibModal, pendingPrintRequestsService, $state, $http) {

    $scope.request = pendingPrintRequest.data.printrequest;

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
        $scope.openSuccessModal("Pedido passará agora para o estado: "+$scope.message);
    };

    $scope.onChangeStatusErroCallback = function(data) {
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
            pendingPrintRequestsService.rejectRequest($scope.request.id, motive, $scope.onChangeStatusSuccessCallback, $scope.onChangeStatusErroCallback);
            //$state.go('employee.pending');
        });
    }

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

app.controller('PrintRequestCancelModalController', ['$scope', '$uibModalInstance',
function($scope, $uibModalInstance){

    $scope.performAction = function () {
        $uibModalInstance.close($scope.motive);
    };

    $scope.closeModal = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
