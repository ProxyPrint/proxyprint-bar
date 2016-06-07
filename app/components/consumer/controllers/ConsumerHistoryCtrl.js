angular.module('ProxyPrint').controller('ConsumerHistoryController', ['$scope', 'consumerSatisfiedRequests', 'consumerSatisfiedRequestsService', function ($scope, consumerSatisfiedRequests, consumerSatisfiedRequestsService) {
      $scope.requests = consumerSatisfiedRequests.data.satisfiedrequests;
}]);
