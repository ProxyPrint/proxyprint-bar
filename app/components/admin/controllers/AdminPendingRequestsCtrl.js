var app = angular.module('ProxyPrint');

// Pending requests table
app.controller('AdminPendingRequestsCtrl', ['$rootScope', '$scope', '$state', '$http', 'pendingRequests', 'pendingRequestsService', '$uibModal', 'paginationService',
function($rootScope, $scope, $state, $http, pendingRequests, pendingRequestsService, $uibModal, paginationService) {

  $scope.pendingRequests = pendingRequests.data;

  $scope.paginationOn = true;
  $scope.pagination = paginationService.getNew(10);
  $scope.pagination.numPages = Math.ceil($scope.pendingRequests.length/$scope.pagination.perPage);

  $scope.lookAtRequest = function (index){
    pendingRequestsService.setCurrentRequest($scope.pendingRequests[index]);
    $state.go('admin.request',{"requestid":index});
  };

}]);

app.controller('RequestModalController', ['$scope', '$uibModalInstance', '$state', 'index', 'text', function ($scope, $uibModalInstance,$state, index, text) {

  $scope.index = index;
  $scope.text = text;

  $scope.performAction = function () {
    $uibModalInstance.close($scope.index);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);

// Consult detail of pending request
app.controller('AdminPendingRequestDetailCtrl', ['$scope', '$state', '$http', 'pendingRequest', '$uibModal', 'pendingRequestsService', function($scope, $state, $http, pendingRequest, $uibModal, pendingRequestsService){

  $scope.request = pendingRequest;
  $scope.showSuccess = false;

  $scope.accept = function() {
    // console.log("Send accept to server...");

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
};

$scope.openRejectModal = function(reply) {

  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: 'app/components/admin/views/admin-request-reject-modal.html',
    controller: 'RegisterRequestCancelModalController',
    size: 'md',
    resolve: {
      index: function() {
        return $scope.index;
      },
      text: function() {
        return reply;
      }
    }
  });

  modalInstance.result.then(function(motive) {
    $scope.showReject = true;
    pendingRequestsService.rejectRequest($scope.request.id, motive);
  });
};

}]);

app.controller('RegisterRequestCancelModalController', ['$scope', '$uibModalInstance',
  function($scope, $uibModalInstance) {

    $scope.performAction = function() {
      $uibModalInstance.close($scope.motive);
    };

    $scope.closeModal = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
]);
