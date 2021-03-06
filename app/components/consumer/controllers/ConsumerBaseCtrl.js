angular.module('ProxyPrint').controller('ConsumerController', ['$scope', '$rootScope', '$cookieStore',
'authenticationService', 'fileTransferService', '$state', 'notifications', 'backendURLService', 'consumerPendingRequests', 'consumerPendingRequestsService', '$uibModal','notificationsService', 'usSpinnerService', 'requestHelperService', 'consumerService',
function($scope, $rootScope, $cookieStore, authenticationService, fileTransferService, $state, notifications, backendURLService, consumerPendingRequests, consumerPendingRequestsService, $uibModal, notificationsService, usSpinnerService, requestHelperService, consumerService) {
  // console.log(backendURLService.getBaseURL());
  // Get consumer location
  var coords = null;
  $scope.isGeoLocationActive = false;
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
      $cookieStore.put('coords', coords);
      $scope.isGeoLocationActive = true;
    });
  }
  if(coords===null) {
    // Default coords University of Minho
    coords = {latitude:41.560501, longitude:-8.397250};
    $cookieStore.put('coords', coords);
  }

  $scope.pdfFiles = [];
  $scope.consumer = $cookieStore.get('globals').currentUser;
  $scope.balance = $cookieStore.get('consumerBalance');
  var audio = new Audio('assets/audio/notifications.mp3');
  var coin = new Audio('assets/audio/coin.mp3');

  // Spinner set up
  $scope.spinneractive = false;

  $rootScope.$on('us-spinner:spin', function(event, key) {
    $scope.spinneractive = true;
  });

  $rootScope.$on('us-spinner:stop', function(event, key) {
    $scope.spinneractive = false;
  });

  var source = new EventSource(backendURLService.getBaseURL() + "/consumer/subscribe?username=" + $scope.consumer.username + "&password=" + $scope.consumer.password, {
    withCredentials: true
  });

  $scope.notifications = notifications.data;
  $scope.newNotifications = getNewNotificationsNumber($scope.notifications);

  var increaseNotifications = function(msg) {
    $scope.$apply(function() {
      var message = JSON.parse(msg.data);
      var d = new Date(message.timestamp);
      message.day = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
      message.hour = d.getHours() + ':' + ('0'+d.getMinutes()).slice(-2);
      message.read = false;
      $scope.notifications.unshift(message);
      $scope.newNotifications += 1;
      // console.log(message);
      audio.play();
      if(message.message.match(/O seu carregamento de [0-9]+(\.[0-9]{1,2})? € via PayPal foi confirmado. Obrigado!/)) {
          coin.play();
          consumerService.getConsumerBalance().success(function(data) {
            $cookieStore.put("consumerBalance", data.balance);
            $state.reload();
          });
      }
    });

  };

  function getNewNotificationsNumber (notifications) {
    var i, total;
    total = 0;
    for (i=0;i<notifications.length;i++){
      if (!notifications[i].read)
      total ++;
    }
    return total;
  }

  $scope.readNotification = function(index) {
    notificationsService.readNotification($scope.notifications[index].id);
    $scope.notifications[index].read = true;
    $scope.newNotifications -= 1;
  };

  $scope.removeNotification = function (index) {
    if (!$scope.notifications[index].read)
    $scope.newNotifications -= 1;

    notificationsService.deleteNotification($scope.notifications[index].id);
    $scope.notifications.splice(index,1);
  };

  $scope.removeAllNotifications = function () {
    notificationsService.deleteAllNotifications($scope.consumer.username);
    $scope.notifications = [];
    $scope.newNotifications = 0;
  };

  $scope.markAllRead = function () {
    var i;
    notificationsService.readAllNotifications($scope.consumer.username);
    for (i=0;i<$scope.notifications.length;i++){
      $scope.notifications[i].read = true;
    }
    $scope.newNotifications = 0;
  };

  source.addEventListener('message', increaseNotifications, false);

  $scope.zeroNotifications = function() {
    $scope.notifications = 0;
  };

  $scope.logout = function() {
    authenticationService.ClearCredentials();
    $location.path('/');
  };

  $scope.pendingRequests = consumerPendingRequests.data.printrequests;


  $scope.addFiles = function (files) {
    if (files && files.length) {
      var i;
      for (i=0;i<files.length;i++)
      $scope.pdfFiles.push(files[i]);
    }
  };

  $scope.uploadFiles = function () {
    usSpinnerService.spin('consumer-spinner');
    if ($scope.pdfFiles && $scope.pdfFiles.length) {
      fileTransferService.setFiles($scope.pdfFiles);
      requestHelperService.setSubmittedFilesStatus(true);
      $state.go('consumer.requestbudget');
    }
    // console.log(fileTransferService.getFiles());
  };

  $scope.resetRequest = function () {
    $scope.pdfFiles = [];
  }

  $scope.openRejectModal = function(reply, id) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/consumer/views/cancel-modal.html',
      controller: 'RequestCancelModalController',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        },
        requestid: function() {
          return id;
        }
      }
    });

    modalInstance.result.then(function(requestid) {
      consumerPendingRequestsService.rejectRequest(requestid, $scope.onCancelSuccessCallback, $scope.onCancelErroCallback);
    });
  };

  $scope.onCancelSuccessCallback = function(data) {
    $scope.openSuccessModal("O pedido foi cancelado com sucesso!");
    $state.reload();
  };

  $scope.onCancelErroCallback = function(data) {
    $scope.openSuccessModal("Ocorreu um erro a alterar o estado do pedido!");
    $state.reload();
  };

  $scope.openSuccessModal = function(reply) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/consumer/views/success-modal.html',
      controller: 'SuccessModalController',
      size: 'sm',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
  };

}]);

angular.module('ProxyPrint').controller('SuccessModalController', ['$scope', '$uibModalInstance', 'text', function($scope, $uibModalInstance, text){

  $scope.text = text;

  $scope.performAction = function () {
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

angular.module('ProxyPrint').controller('RequestCancelModalController', ['$scope', '$uibModalInstance', 'text', 'requestid', function($scope, $uibModalInstance, text, requestid){

  $scope.text = text;
  $scope.id = requestid;

  $scope.performAction = function () {
    $uibModalInstance.close($scope.id);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
