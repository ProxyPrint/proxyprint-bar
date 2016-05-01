angular.module('ProxyPrint').controller('PendingRequestsCtrl', ['$scope', 'pendingPrintRequests', 'PendingPrintRequestsService',
function($scope, pendingPrintRequests, PendingPrintRequestsService) {

    // $scope.pendingRequests = [
    //     { id: "1", consumer: "João Matias", arrivalTimestamp: "11/7/2014 12:15"},
    //     { id: "2", consumer: "Costelo", arrivalTimestamp: "11/7/2014 11:15"},
    //     { id: "3", consumer: "Maria Bina", arrivalTimestamp: "11/7/2014 10:22"},
    //     { id: "4", consumer: "Joana Freitas", arrivalTimestamp: "11/7/2014 03:30"},
    //     { id: "5", consumer: "Daniel Caldas", arrivalTimestamp: "11/7/2014 02:10"}
    // ];
    $scope.pendingRequests = angular.fromJson(pendingPrintRequests.data.printrequest);
    $scope.paginationOn = true;

    $scope.attendRequest = function(requestID) {
        window.alert("Atender pedido "+requestID);
    };

    $scope.cancelRequest = function(requestID) {
        window.alert("Cancelar pedido "+requestID);
    };

}]);
