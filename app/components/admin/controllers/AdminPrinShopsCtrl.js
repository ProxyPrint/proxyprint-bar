var app = angular.module('ProxyPrint');


app.controller('AdminPrintShopsCtrl', ['$scope', 'paginationService', function($scope, paginationService) {

   $scope.printshops = [
       {
           id : 1,
           name : 'Video Norte',
           admissionDate : '12-03-2015 17:07',
           registerDate : '12-03-2015 17:37',
           manager : 'Manuel Barbosa',
           address : 'Rua Nova de Santa Cruz',
           email : 'videonorte@gmail.com'
       },
       {
           id : 2,
           name : '17A',
           admissionDate : '30-03-2015 15:30',
           registerDate : '30-03-2015 16:00',
           manager : 'Joaquim Silva',
           address : 'Rua Nova de Santa Cruz',
           email : '17a@gmail.com'
       },
       {
           id : 3,
           name : 'Copy Scan',
           admissionDate : '05-04-2015 11:15',
           registerDate : '05-04-2015 11:45',
           manager : 'Francisco Alves',
           address : 'Rua Nova de Santa Cruz',
           email : 'copyscan@gmail.com'
       }
   ];

   $scope.paginationOn = true;
   $scope.pagination = paginationService.getNew(10);
   $scope.pagination.numPages = Math.ceil($scope.printshops.length/$scope.pagination.perPage);

}]);
