angular.module('ProxyPrint').controller('HistoryRequestsCtrl', ['$scope', 'historyPrintRequests', 'historyPrintRequestsService', 'paginationService', '$state',
      function($scope, historyPrintRequests, historyPrintRequestsService,paginationService, $state) {

   $scope.historyRequests = historyPrintRequests.data.historyrequests;;
   console.log($scope.historyRequests);
   $scope.paginationOn = true;
   $scope.pagination = paginationService.getNew(10);
   $scope.pagination.numPages = Math.ceil($scope.historyRequests.length/$scope.pagination.perPage);

   $scope.filterRequests = function(client) {
       return (client.consumer.name.match($scope.requestSearch));
   };

   $scope.lookAtRequest = function (request){
       $state.go('employee.historyconsult',{"requestid":request.id});
   };

}]);
