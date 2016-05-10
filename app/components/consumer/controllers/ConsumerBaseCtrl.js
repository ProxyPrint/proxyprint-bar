angular.module('ProxyPrint').controller('ConsumerController', ['$scope','$cookieStore',
'authenticationService', 'fileTransferService', '$state', 'notifications', 'backendURLService',
function($scope, $cookieStore, authenticationService, fileTransferService, $state, notifications,backendURLService) {

  // Get consumer location
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      var coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
      $cookieStore.put('coords', coords);
    });
  } else {
    // Default coords University of Minho
    var coords = {latitude:41.560501, longitude:-8.397250};
    $cookieStore.put('coords', coords);
  }

  $scope.consumer = $cookieStore.get('globals').currentUser;
  var audio = new Audio('assets/audio/notifications.mp3');

  console.log($scope.consumer);

  var source = new EventSource(backendURLService.getBaseURL() + "/consumer/subscribe?username=" + $scope.consumer.username + "&password=" + $scope.consumer.password, {
    withCredentials: true
  });

  $scope.notifications = notifications.data;
  $scope.newNotifications = 0;

  var increaseNotifications = function(msg) {
    $scope.$apply(function() {
      console.log($scope.newNotifications);
      var message = JSON.parse(msg.data);
      var d = new Date(message.timestamp);
      message.day = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
      message.hour = d.getHours() + ':' + d.getMinutes();
      message.read = false;
      $scope.notifications.unshift(message);
      $scope.newNotifications += 1;
      audio.play();
    });

  };

  $scope.readNotification = function(index) {
    $scope.notifications[index].read = true;
    $scope.newNotifications -= 1;
  };

  source.addEventListener('message', increaseNotifications, false);

  $scope.zeroNotifications = function() {
    $scope.notifications = 0;
  };

  $scope.logout = function() {
    authenticationService.ClearCredentials();
    $location.path('/');
  };

  $scope.pendingRequests = [{
    requestID: 1,
    day: "15/03/2016",
    hour: "22:33"
  }, {
    requestID: 2,
    day: "15/03/2016",
    hour: "12:33"
  }, {
    requestID: 3,
    day: "17/03/2016",
    hour: "14:22"
  }, {
    requestID: 4,
    day: "18/03/2016",
    hour: "12:22"
  }, {
    requestID: 5,
    day: "19/03/2016",
    hour: "19:32"
  }];

  $scope.pdfFiles = [];


  $scope.addFiles = function (files) {
    if (files && files.length) {
      var i;
      for (i=0;i<files.length;i++)
      $scope.pdfFiles.push(files[i]);
    }
  };

  $scope.uploadFiles = function () {
    if ($scope.pdfFiles && $scope.pdfFiles.length) {
      fileTransferService.setFiles($scope.pdfFiles);
      $state.go('consumer.requestbudget');
    }
  };

}]);
