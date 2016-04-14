angular.module('ProxyPrint').controller('AdminBaseCtrl', ['$scope', '$cookieStore', 'AuthenticationService', '$state',
      function($scope, $cookieStore, AuthenticationService, $state) {

   $scope.manager = $cookieStore.get('globals').currentUser;

   $scope.logout = function(){
      AuthenticationService.ClearCredentials();
      $state.go('adminlogin');
   };

}]);
