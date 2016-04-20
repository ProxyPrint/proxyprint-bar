var app = angular.module('ProxyPrint');

// Pending requests table
app.controller('AdminPendingRequestsCtrl', ['$rootScope', '$scope', '$state', '$http', 'pendingRequests', function($rootScope, $scope, $state, $http, pendingRequests) {

  $scope.pendingRequests = pendingRequests.data;

  $scope.consult = function (id) {
    var pos = $scope.pendingRequests.map(function(req) { return req.id; }).indexOf(id);
    $rootScope.currentRequest = $scope.pendingRequests[pos];
    $state.go('admin.request',{"requestid":id});
  };

}]);

// Consult detail of pending request
app.controller('AdminPendRequestDetailCtrl', ['$rootScope', '$scope', '$state', '$http', 'PendingRequestsService', function($rootScope, $scope, $state, $http, PendingRequestsService){
  $scope.request = $rootScope.currentRequest;

  $scope.accept = function() {
    console.log("Send accept to server...");

    var data = PendingRequestsService.acceptRequest($scope.request.id)
    .then( function(data) {
        if(data.success) {
          $scope.showSuccess = true;
          $state.go("admin.printshops");
        }
      }
    );

  };

  $scope.reject = function() {
    alert("JCortez reject the request...");
  };
}]);
