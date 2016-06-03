angular.module('ProxyPrint').controller('AdminBaseCtrl', ['$scope', '$cookieStore', 'authenticationService', '$state',
      function($scope, $cookieStore, authenticationService, $state) {

   $scope.admin = $cookieStore.get('globals').currentUser;
   $scope.balance = $cookieStore.get('platformBalance');

   $scope.logout = function(){
      authenticationService.ClearCredentials();
      $state.go('adminlogin');
   };

   // Navigation highlight
   $scope.navigation = { requests: "active", printshops: "" };
   $scope.navigate = function(where) {
     for(var i in $scope.navigation){ $scope.navigation[i] = ""; }
     $scope.navigation[where] = "active";
   };

}]);
