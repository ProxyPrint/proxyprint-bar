var app = angular.module('ProxyPrint');

app.controller('ConsultHistoryRequestCtrl', ['$scope', 'historyPrintRequest', '$uibModal', 'pendingPrintRequestsService', '$state', '$http', '$window', 'backendURLService',
function($scope, historyPrintRequest, $uibModal, pendingPrintRequestsService, $state, $http, $window, backendURLService) {

    $scope.request = historyPrintRequest.data.printrequest;
    console.log($scope.request);

    $scope.isDataLoading = false;

    $scope.$watch('$scope.request.status', function() {
        if ($scope.request.status == 'LIFTED') {
            $scope.message = "Pedido finalizado";
        }
    });

    $scope.files = historyPrintRequest.data.printrequest.documents;

}]);
