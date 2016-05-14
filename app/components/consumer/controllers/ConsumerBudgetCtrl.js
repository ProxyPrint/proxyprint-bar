angular.module('ProxyPrint').controller('ConsumerBudgetCtrl', ['$scope','$cookieStore', '$state', 'budgets',
function($scope, $cookieStore, $state, budgets) {

  $scope.budgets = budgets;
  console.log(budgets);

}]);
