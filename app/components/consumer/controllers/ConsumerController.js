angular.module('ProxyPrint').controller('ConsumerController', ['$scope','$http','$cookieStore',
      'AuthenticationService', 'FileTransferService','$rootScope', '$location', '$timeout', '$state',
      function($scope, $http, $cookieStore, AuthenticationService, FileTransferService, $rootScope, $location, $timeout, $state) {

   //$scope.consumer = $cookieStore.get('globals').currentUser;
   $scope.consumer = "joão";
   
   $scope.logout = function() {
      AuthenticationService.ClearCredentials();
      $location.path('/');
   };

   $scope.pendingRequests = [{
      requestID: 1,
      day: "15/03/2016",
      hour: "22:33"
   },{
      requestID: 2,
      day: "15/03/2016",
      hour: "12:33"
   },{
      requestID: 3,
      day: "17/03/2016",
      hour: "14:22"
   },{
      requestID: 4,
      day: "18/03/2016",
      hour: "12:22"
   },{
      requestID: 5,
      day: "19/03/2016",
      hour: "19:32"
   }];

   $scope.notifications = 5;


    $scope.uploadFiles = function (files) {
        if (files && files.length) {
           FileTransferService.setFiles(files);
           $state.go('consumer.requestbudget');
        }
    };

    $scope.uploadFilesTest = function () {
      var files = FileTransferService.getFiles;
      FileTransferService.TransferFiles(files);
   }

}]);
