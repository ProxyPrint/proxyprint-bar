angular.module('ProxyPrint').controller('ConsumerController', ['$scope','$cookieStore',
      'authenticationService', 'fileTransferService','$rootScope', '$location', '$timeout', '$state',
      function($scope, $cookieStore, authenticationService, fileTransferService, $rootScope, $location, $timeout, $state, $q) {

   $scope.consumer = $cookieStore.get('globals').currentUser;

   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        var coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        $cookieStore.put('coords', coords);
      });
    }

   $scope.logout = function() {
      authenticationService.ClearCredentials();
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
          console.log(files.length);
           fileTransferService.setFiles(files);
           $state.go('consumer.requestbudget');
        }
    };

    $scope.uploadFilesTest = function () {
      var files = fileTransferService.getFiles;
      fileTransferService.TransferFiles(files);
   }

}]);
