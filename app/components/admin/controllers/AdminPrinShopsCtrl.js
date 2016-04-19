var app = angular.module('ProxyPrint');

app.controller('AdminPrintShopsCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    /*$http.get('http://localhost:8080/printshops').success(function(data){
      console.log(data);
      $scope.listRepro = data;
    });*/
    $scope.listRepro = staticContent;

    // This show success message if admin has
    // just accepted a pshop request
    $scope.showSuccess = $rootScope.showSuccess;
    $scope.request = $rootScope.request;

    $scope.consult = function (){
        $scope.answer = 'Consultar Reprografia!';
    };

    $scope.delete = function (){
        $scope.answer = 'Reprografia Eliminada!';
    };
}]);

var staticContent = [
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
