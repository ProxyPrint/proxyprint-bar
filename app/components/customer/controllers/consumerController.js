angular.module('ProxyPrint').controller('costumerController', ['$scope', '$http','$cookieStore', 'AuthenticationService', '$rootScope',
      function($scope, $http, $cookieStore, AuthenticationService, $rootScope) {



   $scope.testSecured = function() {
      $http.get('http://localhost:8080/api/secured')
         .then(function(response) {
            console.log(response);
         });
   };

   $scope.logout = function (){
      AuthenticationService.ClearCredentials();
   };

}]);
