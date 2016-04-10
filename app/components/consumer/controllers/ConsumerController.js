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

}]);
