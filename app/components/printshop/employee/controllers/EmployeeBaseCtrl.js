angular.module('ProxyPrint').controller('EmployeeBaseCtrl', ['$scope', '$http','$cookieStore', '$state', 'AuthenticationService', '$rootScope', '$location',
      function($scope, $http, $cookieStore, AuthenticationService, $rootScope, $state, $location) {

   $scope.employee = $cookieStore.get('globals').currentUser;

   // nafunc
   $scope.logout = function(){
      AuthenticationService.ClearCredentials();
      $state.go('printshop');
   };

}]);
