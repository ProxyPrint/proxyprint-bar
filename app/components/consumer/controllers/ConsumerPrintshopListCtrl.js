angular.module('ProxyPrint')
   .controller('ConsumerPrintshopList', ['$scope','$state','printshops',
        function ($scope,$state,printshops) {

      $scope.printshops = printshops.data;
      // console.log($scope.printshops);
      $scope.limit = 5;
      $scope.loadPrintshop = function (index) {
        $state.go('consumer.printshop', {printshopid: index});
      }



      $scope.loadMore = function() {
            var incremented = $scope.limit + 5;
            $scope.limit = incremented > $scope.printshops.length ? $scope.printshops.length : incremented;

        };


}]);
