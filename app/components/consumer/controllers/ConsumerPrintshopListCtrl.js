angular.module('ProxyPrint')
   .controller('ConsumerPrintshopList', ['$scope','$state','printshops',
        function ($scope,$state,printshops) {

      $scope.printshops = printshops.data;

      $scope.loadPrintshop = function (index) {
        $state.go('consumer.printshop', {printshopid: $scope.printshops[index].id});
      }

}]);
