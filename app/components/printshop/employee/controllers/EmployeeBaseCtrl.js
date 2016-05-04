angular.module('ProxyPrint').controller('EmployeeBaseCtrl', ['$scope', '$cookieStore', 'authenticationService', '$state',
      function($scope, $cookieStore, authenticationService, $state) {

   $scope.employee = $cookieStore.get('globals').currentUser;

   $scope.logout = function(){
      authenticationService.ClearCredentials();
      $state.go('printshop');
   };

}]);
