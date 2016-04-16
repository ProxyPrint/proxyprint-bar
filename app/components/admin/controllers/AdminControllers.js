
var app = angular.module('ProxyPrint');


app.controller('AdminRequestsController', ['$scope', '$uibModal','$state','requestID', function($scope, $uibModal, $state, requestID) {


   $scope.pendingRegisterRequests = [
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

   $scope.index = requestID;
   $scope.selectedRequest = $scope.pendingRegisterRequests[requestID];



  $scope.lookAtRequest = function (id){
     $state.go('admin.request',{"requestid":id});
  };

    $scope.openModal = function (reply) {

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'app/components/admin/views/rejectRequestModal.html',
         controller: 'RejectRequestModalController',
         size: 'sm',
         resolve: {
            index: function() {
               return $scope.index;
            },
            text: function(){
               return reply;
            }
         }
      });

      modalInstance.result.then(function (index) {
        console.log('GOTTA REJECT THIS REQUEST!!: '+index);
        $state.go('admin.requests');
     });
    }

    $scope.accept = function (){
        $scope.answer = 'Reprografia adicionada!';
    };


}]);

app.controller('RejectRequestModalController', function ($scope, $uibModalInstance,$state, index, text) {

  $scope.index = index;
  $scope.text = text;

  $scope.rejectRequest = function () {
    $uibModalInstance.close($scope.index);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});




app.controller('ReproController', ['$scope', function($scope) {
    this.listRepro = staticContent;

    $scope.consult = function (){
        $scope.answer = 'Consultar Reprografia!';
    };

    $scope.delete = function (){
        $scope.answer = 'Reprografia Eliminada!';
    };
}]);
