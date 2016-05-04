var app = angular.module('ProxyPrint');

// Pending requests table
app.controller('AdminPendingRequestsCtrl', ['$rootScope', '$scope', '$state', '$http', 'pendingRequests', 'pendingRequestsService',
function($rootScope, $scope, $state, $http, pendingRequests, pendingRequestsService) {

  $scope.pendingRequests = pendingRequests.data;

  $scope.lookAtRequest = function (index){
    pendingRequestsService.setCurrentRequest($scope.pendingRequests[index]);
    $state.go('admin.request',{"requestid":index});
  };

}]);

app.controller('RequestModalController', function ($scope, $uibModalInstance,$state, index, text) {

  $scope.index = index;
  $scope.text = text;

  $scope.performAction = function () {
    $uibModalInstance.close($scope.index);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Consult detail of pending request
app.controller('AdminPendingRequestDetailCtrl', ['$scope', '$state', '$http', 'pendingRequest', '$uibModal', 'pendingRequestsService'
, function($scope, $state, $http, pendingRequest, $uibModal, pendingRequestsService){

  $scope.request = pendingRequest;
  $scope.showSuccess = false;

  $scope.accept = function() {
    console.log("Send accept to server...");

    var data = pendingRequestsService.acceptRequest($scope.request.id)
    .then( function(data) {
      if(data.success) {
        $scope.showSuccess = true;
        $state.go("admin.printshops");
      }
    }
  );

};

$scope.openAcceptModal = function(reply) {

  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: 'app/components/admin/views/request-modal.html',
    controller: 'RequestModalController',
    size: 'sm',
    resolve: {
      index: function() {
        return $scope.index;
      },
      text: function() {
        return reply;
      }
    }
  });

  modalInstance.result.then(function(index) {
    $scope.showSuccess = true;
    pendingRequestsService.acceptRequest($scope.request.id);
  });
}

$scope.openRejectModal = function(reply) {

  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: 'app/components/admin/views/request-modal.html',
    controller: 'RequestModalController',
    size: 'sm',
    resolve: {
      index: function() {
        return $scope.index;
      },
      text: function() {
        return reply;
      }
    }
  });

  modalInstance.result.then(function(index) {
    $scope.showReject = true;
    pendingRequestsService.rejectRequest($scope.request.id);
  });
}

}]);
