angular.module('ProxyPrint').controller('ManagerStatsCtrl', ['$scope', '$cookieStore', 'stats', function($scope, $cookieStore, stats) {
  $scope.balance = $cookieStore.get('pshopBalance');
  $scope.stats = stats.data;
}]);
