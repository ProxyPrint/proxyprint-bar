angular.module('ProxyPrint').controller('ConsumerController', ['$scope','$http','$cookieStore',
      'AuthenticationService', 'FileTransferService','$rootScope', '$location', '$timeout',
      function($scope, $http, $cookieStore, AuthenticationService, FileTransferService, $rootScope, $location, $timeout) {

   $scope.consumer = $cookieStore.get('globals').currentUser;

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
           FileTransferService.TransferFiles(files);
        }
    };

}]);
