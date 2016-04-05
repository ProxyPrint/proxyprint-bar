angular.module('ProxyPrint').controller('ConsumerController', ['$scope', '$http','$cookieStore', 'AuthenticationService', '$rootScope', '$location',
      function($scope, $http, $cookieStore, AuthenticationService, $rootScope, $location) {

   /*$http.get('http://localhost:8080/consumer/register').success(function(data) {
     ...
   });*/

   // this.consumer = JSON.parse($cookieStore.user);
   this.consumer = $rootScope.user;

   $scope.testSecured = function() {
      $http.get('http://localhost:8080/api/secured')
         .then(function(response) {
            console.log(response);
         });
   };

   $scope.logout = function (){
      AuthenticationService.ClearCredentials();
      $location.path('/');
   };

}]);
