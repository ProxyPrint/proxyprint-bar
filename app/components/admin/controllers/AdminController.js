
var app = angular.module('ProxyPrint');

app.controller('RequestsController', ['$scope', function($scope) {
    this.pendingRequests = staticContent;

    $scope.accept = function (){
        $scope.answer = 'Reprografia adicionada!';
    };

    $scope.reject = function (){
        $scope.answer = 'Reprografia removida!';
    };

}]);

app.controller('ReproController', ['$scope', function($scope) {
    this.listRepro = staticContent;

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
        manager : 'Manuel Barbosa'
    },
    {
        id : 2,
        name : '17A',
        admissionDate : '30-03-2015 15:30',
        registerDate : '30-03-2015 16:00',
        manager : 'Joaquim Silva'
    },
    {
        id : 3,
        name : 'Copy Scan',
        admissionDate : '05-04-2015 11:15',
        registerDate : '05-04-2015 11:45',
        manager : 'Francisco Alves'
    }
];
