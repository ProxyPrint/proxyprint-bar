angular.module('ProxyPrint').controller('AdminBaseCtrl', ['$scope', '$cookieStore', 'authenticationService', '$state',
      function($scope, $cookieStore, authenticationService, $state) {

   $scope.admin = $cookieStore.get('globals').currentUser;

   $scope.logout = function(){
      authenticationService.ClearCredentials();
      $state.go('adminlogin');
   };

}]);
