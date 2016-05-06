angular.module('ProxyPrint').controller('ConsumerController', ['$scope','$cookieStore',
      'authenticationService', 'fileTransferService','$rootScope', '$location', '$timeout', '$state', 'backendURLService',
      function($scope, $cookieStore, authenticationService, fileTransferService, $rootScope, $location, $timeout, $state, backendURLService) {

   $scope.consumer = $cookieStore.get('globals').currentUser;
   var audio = new Audio('assets/notif.mp3');

   var source = new EventSource(backendURLService.getBaseURL()+"consumer/subscribe?username="+$scope.consumer.username, {withCredentials: true});

   $scope.notifications= new Array();

   var increaseNotifications = function (msg) {
     $scope.$apply(function () {
                var message = JSON.parse(msg.data);
                console.log(message.message);
                $scope.notifications.push(message);
                audio.play();

            });

   }

   source.addEventListener('message', increaseNotifications, false);


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
