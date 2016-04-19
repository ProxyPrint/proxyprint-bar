var app = angular.module('ProxyPrint');

// Pending requests table
app.controller('AdminPendingRequestsCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http) {

  $http.get('http://localhost:8080/requests/pending').success(function(data){
    console.log("GET");
    $scope.pendingRequests = data;
  });

  $scope.consult = function (id) {
    var pos = $scope.pendingRequests.map(function(req) { return req.id; }).indexOf(id);
    console.log($scope.pendingRequests[pos]);
    $rootScope.currentRequest = $scope.pendingRequests[pos];
    $state.go('admin.request',{"requestid":id});
  };

}]);

// Consult detail of pending request
app.controller('AdminPendRequestDetailCtrl', ['$rootScope', '$scope', '$state', '$http', function($rootScope, $scope, $state, $http){
  $scope.request = $rootScope.currentRequest;

  $scope.accept = function() {
    console.log("Send accept to server...");

    // WORKS OK! JUST SAYING PARSER ERROR
    var url = "http://localhost:8080/request/accept/"+$scope.request.id;
    $http.post(url).success(function(data){
      if(data.success) {
        $rootScope.showSuccess = true;
        $rootScope.request = $scope.request;
        $state.go("admin.printshops");
      }
    });

  };

  $scope.reject = function() {
    alert("JCortez reject the request...");
  };
}]);
