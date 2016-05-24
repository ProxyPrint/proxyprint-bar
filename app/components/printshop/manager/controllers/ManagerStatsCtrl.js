angular.module('ProxyPrint').controller('ManagerStatsCtrl', ['$scope', 'stats',
function($scope, stats) { $scope.stats = stats.data; console.log($scope.stats); }]);
