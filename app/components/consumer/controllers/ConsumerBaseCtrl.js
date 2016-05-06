angular.module('ProxyPrint').controller('ConsumerController', ['$scope','$cookieStore',
      'authenticationService', 'fileTransferService','$rootScope', '$location', '$timeout', '$state', 'backendURLService',
      function($scope, $cookieStore, authenticationService, fileTransferService, $rootScope, $location, $timeout, $state, backendURLService) {

   $scope.consumer = $cookieStore.get('globals').currentUser;
   var audio = new Audio('assets/sound2.mp3');

   var source = new EventSource(backendURLService.getBaseURL()+"consumer/subscribe?username="+$scope.consumer.username, {withCredentials: true});

   $scope.notifications= new Array();
   $scope.newNotifications = 0;

   var increaseNotifications = function (msg) {
     $scope.$apply(function () {
                console.log($scope.newNotifications);
                var message = JSON.parse(msg.data);
                var d = new Date(message.timestamp);
                message.day = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
                message.hour = d.getHours()+':'+d.getMinutes();
                message.read = false;
                $scope.notifications.push(message);
                $scope.newNotifications += 1;
                audio.play();
            });

   }

   $scope.readNotification = function (index) {
     $scope.notifications[index].read = true;
     $scope.newNotifications -= 1;
   }

   source.addEventListener('message', increaseNotifications, false);

   $scope.zeroNotifications = function () {
     $scope.notifications = 0;
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
