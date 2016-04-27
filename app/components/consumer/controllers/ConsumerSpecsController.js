angular.module('ProxyPrint').controller('ConsumerSpecsController',
  ['$scope' , '$uibModal', '$log', 'FileTransferService', 'SpecMarshallService',
    function($scope, $uibModal, $log, FileTransferService, SpecMarshallService) {

    /** Page range logic */
    $scope.showModal = false;
    $scope.lastItem = null;
    $scope.lastFile = null;

    $scope.toggleModal = function(file, item){
        $scope.lastItem = item;
        $scope.lastFile = file;
        $scope.showModal = !$scope.showModal;
        return item;
    };

    /** Remove file from queue */
    $scope.remove = function (item, spec){
        var files = $scope.files();
        var i = files.indexOf(item);
        var index = files[i].specs.indexOf(spec);
        if (index > -1) {
            files[i].specs.splice(index, 1);
        }
    };

    /** Cancel request to add the file to queue */
    $scope.cancel = function (){
        $scope.remove($scope.lastFile, $scope.lastItem);
        $scope.showModal = false;
    };

    /** Add file to queue */
    $scope.submit = function(init, end, check){
        if(!check){var interval = init + ' - ' + end;}
        else{var interval = "Completo"}

        var files = $scope.files();
        var i = files.indexOf($scope.lastFile);
        var index = files[i].specs.indexOf($scope.lastItem);
        if (index > -1) {
            files[i].specs[index].pages = interval;
        }
        $scope.showModal = false;
    };

    /** Request modal logic */
    $scope.showRequest = false;

    $scope.toggleRequest = function(){
        $scope.showRequest = !$scope.showRequest;
    };

    $scope.back = function (){
        $scope.showRequest = false;
    };

    $scope.request = function(){
        /** Send Request */
        FileTransferService.TransferFiles($scope.files());
    };

    $scope.queueNumber = function (){
        var i = 0;
        angular.forEach($scope.files(), function(file){
            if(file.specs.length != 0){
                i++;
            }
        });
        return i;
    }

    $scope.files = FileTransferService.getFiles;

    $scope.addSpecModal = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/consumer/views/spec-modal.html',
        controller: 'AddSpecificationController',
        size: 'md'
      });

      modalInstance.result.then(function(spec) {
        var specification = SpecMarshallService.marshallSpecification(spec);
        specification.fakeId = $scope.specs.length+1;
        $scope.specs.push(specification);
        console.log(specification);
      });
    }

    $scope.specs = [
            {
                id: 101,
                fakeId: 1,
                name: "Esquema1",
                paperSpecs: "COLOR,A4,SIMPLEX",
                bindingSpecs: "PLASTIC",
                coverSpecs: "CRISTAL_ACETATE",

            }, {
                id: 102,
                fakeId: 2,
                name: "Esquema xpto",
                paperSpecs: "COLOR,A4,SIMPLEX",
                bindingSpecs: "",
                coverSpecs: ""
            }, {
                id: 100,
                fakeId: 3,
                name: "Esquema 2",
                paperSpecs: "COLOR,A4,SIMPLEX",
                bindingSpecs:"STAPLING",
                coverSpecs:""
            }
        ];
}]);

angular.module('ProxyPrint').controller('AddSpecificationController', function ($scope, $uibModalInstance) {

  $scope.performAction = function () {
    var spec = new Array();
    spec.push($scope.name)
    spec.push($scope.format);
    spec.push($scope.sides);
    spec.push($scope.colors);
    spec.push($scope.content);
    spec.push($scope.cover);
    spec.push($scope.bindings);
    $uibModalInstance.close(spec);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
