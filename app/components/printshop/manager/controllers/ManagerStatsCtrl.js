angular.module('ProxyPrint').controller('ManagerStatsCtrl', ['$scope', '$http','$cookieStore', '$state', 'AuthenticationService', '$rootScope', '$location',
function($scope, $http, $cookieStore, AuthenticationService, $rootScope, $state, $location) {

  $scope.stats = {
    likes: "442",
    requests: "1432",
    newClients: "56"
  }

}]);
