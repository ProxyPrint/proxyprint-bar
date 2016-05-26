angular.module('ProxyPrint')
   .controller('ConsumerPrintshopList', ['$scope','$state','printshops',
        function ($scope,$state,printshops) {

      $scope.printshops = printshops.data;
      $scope.limit = 5;
      $scope.loadPrintshop = function (index) {
        $state.go('consumer.printshop', {printshopid: $scope.printshops[index].id});
      }

      $scope.loadMore = function() {
            var incremented = $scope.limit + 5;
            $scope.limit = incremented > $scope.printshops.length ? $scope.printshops.length : incremented;
        };

}]);
