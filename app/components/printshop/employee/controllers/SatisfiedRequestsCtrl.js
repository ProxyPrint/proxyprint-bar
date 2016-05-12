angular.module('ProxyPrint').controller('SatisfiedRequestsCtrl', ['$scope', 'satisfiedPrintRequest', '$uibModal', 'satisfiedPrintRequestsService', function($scope, satisfiedPrintRequest, $uibModal, satisfiedPrintRequestsService) {

    $scope.satisfiedRequests = satisfiedPrintRequest.data.satisfiedrequests;

    $scope.paginationOn = false;

    $scope.liftRequest = function(requestID) {
        window.alert("Levantar pedido "+requestID);
    };

    $scope.filterRequests = function(client) {
      return (client.consumer.name.match($scope.requestSearch));
    };

}]);
