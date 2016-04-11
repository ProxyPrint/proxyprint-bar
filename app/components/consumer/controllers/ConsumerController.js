angular.module('ProxyPrint').controller('ConsumerController', ['$scope', '$http','$cookieStore', 'AuthenticationService', '$rootScope', '$location',
      function($scope, $http, $cookieStore, AuthenticationService, $rootScope, $location) {

   $scope.consumer = $cookieStore.get('globals').currentUser;

   $scope.testSecured = function() {
      $http.get('http://localhost:8080/api/secured')
         .then(function(response) {
            console.log(response);
         });
   };

   // Not working yet
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

}]);
