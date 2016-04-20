angular.module('ProxyPrint').controller('EmployeeBaseCtrl', ['$scope', '$cookieStore', 'AuthenticationService', '$state',
      function($scope, $cookieStore, AuthenticationService, $state) {

   $scope.employee = $cookieStore.get('globals').currentUser;

   $scope.logout = function(){
      AuthenticationService.ClearCredentials();
      $state.go('printshop');
   };

}]);
