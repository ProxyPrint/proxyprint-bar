var app = angular.module('ProxyPrint');

app.controller('AdminPrintShopsCtrl', ['$scope', 'printshops', function($scope,printshops) {
  console.log(printshops.data);
   $scope.printshops = printshops.data;

   $scope.filterPShops = function(pshop) {
     return (pshop.name.match($scope.searchInput) || pshop.address.match($scope.searchInput));
   };

}]);
