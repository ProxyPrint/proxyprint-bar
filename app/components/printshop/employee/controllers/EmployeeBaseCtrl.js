angular.module('ProxyPrint').controller('EmployeeBaseCtrl', ['$scope', '$http','$cookieStore', '$state', 'AuthenticationService', '$rootScope', '$location',
      function($scope, $http, $cookieStore, AuthenticationService, $rootScope, $state, $location) {

   $scope.employee = $cookieStore.get('globals').currentUser;

   $scope.logout = function(){
      AuthenticationService.ClearCredentials();
      $location.path('/printshop');
   };

}]);
