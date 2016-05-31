angular.module('ProxyPrint').controller('PendingRequestsCtrl', ['$scope', 'pendingPrintRequests', 'pendingPrintRequestsService', '$state', 'paginationService',
function($scope, pendingPrintRequests, pendingPrintRequestsService, $state, paginationService) {

    $scope.pendingRequests = pendingPrintRequests.data.printrequest;

    $scope.paginationOn = true;
    $scope.pagination = paginationService.getNew(10);
    $scope.pagination.numPages = Math.ceil($scope.pendingRequests.length/$scope.pagination.perPage);

    $scope.lookAtRequest = function (request){
        $state.go('employee.consult',{"requestid":request.id});
    };

}]);
