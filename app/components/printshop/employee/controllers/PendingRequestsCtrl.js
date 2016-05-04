angular.module('ProxyPrint').controller('PendingRequestsCtrl', ['$scope', 'pendingPrintRequests', 'PendingPrintRequestsService',
function($scope, pendingPrintRequests, PendingPrintRequestsService) {

    $scope.pendingRequests = pendingPrintRequests.data.printrequest;

    $scope.paginationOn = true;

    $scope.attendRequest = function(requestID) {
        window.alert("Atender pedido "+requestID);
    };

    $scope.cancelRequest = function(requestID) {
        window.alert("Cancelar pedido "+requestID);
    };

}]);
