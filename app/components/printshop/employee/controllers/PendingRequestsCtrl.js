angular.module('ProxyPrint').controller('PendingRequestsCtrl', ['$scope', 'pendingPrintRequests', 'pendingPrintRequestsService', '$state',
function($scope, pendingPrintRequests, pendingPrintRequestsService, $state) {

    $scope.pendingRequests = pendingPrintRequests.data.printrequest;

    $scope.paginationOn = true;

    $scope.lookAtRequest = function (request){
      pendingPrintRequestsService.setCurrentRequest(request);
      $state.go('employee.consult',{"requestid":request.id});
    };

}]);
