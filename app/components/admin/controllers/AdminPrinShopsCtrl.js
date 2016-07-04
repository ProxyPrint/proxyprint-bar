var app = angular.module('ProxyPrint');

app.controller('AdminPrintShopsCtrl', ['$scope', 'printshops','paginationService',
  function($scope,printshops, paginationService) {
  // console.log(printshops.data);
   $scope.printshops = printshops.data;

   $scope.filterPShops = function(pshop) {
     return (pshop.name.match($scope.searchInput) || pshop.address.match($scope.searchInput));
   };

   $scope.paginationOn = true;
   $scope.pagination = paginationService.getNew(10);
   $scope.pagination.numPages = Math.ceil($scope.printshops.length/$scope.pagination.perPage);

}]);
