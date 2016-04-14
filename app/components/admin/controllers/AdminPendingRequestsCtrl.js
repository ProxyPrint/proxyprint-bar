angular.module('ProxyPrint').controller('AdminPendingRequestsCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {

  $http.get('http://localhost:8080/requests/pending').success(function(data){
    $scope.pendingRequests = data;
  });

  $scope.analisys = function (id){
    $state.go('admin.request',{"requestid":id});
  };

}]);
