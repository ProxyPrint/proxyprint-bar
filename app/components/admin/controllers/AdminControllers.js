
var app = angular.module('ProxyPrint');

app.controller('RequestsController', ['$scope', '$state', function($scope, $state) {
    this.pendingRequests = staticContent;

    $scope.analisys = function (id){
        $state.go('admin.request',{"requestid":id});
    };
}]);

app.controller('RequestController', ['$scope', '$uibModal', function($scope, $uibModal) {
    this.request = staticContent[1];

    $scope.openModal = function (text) {
      console.log(text);
       var modalInstance = $uibModal.open({
         animation: true,
         template: '<div class="modal-header"><h3 class="modal-title"></h3></div>' +
                   '<div class="modal-body"><h4>'+text+'</h4>  </div>' +
                   '<div class="modal-footer"><a class="btn btn-default">Ok</a></div>',
         size: 'sm'
      });
    }


    $scope.accept = function (){
        $scope.answer = 'Reprografia adicionada!';
    };

    $scope.reject = function (){
        $scope.answer = 'Reprografia rejeitada!';
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
