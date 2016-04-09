angular.module('ProxyPrint').controller('EmployeeBaseCtrl', ['$scope', '$http','$cookieStore', '$state', 'AuthenticationService', '$rootScope', '$location',
      function($scope, $http, $cookieStore, AuthenticationService, $rootScope, $state, $location) {

   /*CODE*/
   $scope.employee = $cookieStore.get('globals').currentUser;

}]);
