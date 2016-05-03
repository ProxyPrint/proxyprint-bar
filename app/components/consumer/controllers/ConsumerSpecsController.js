angular.module('ProxyPrint').controller('ConsumerSpecsController',
  ['$scope' , '$uibModal', '$log', 'FileTransferService', 'SpecMarshallService',
      'printingSchemas', 'PrintingSchemaService', '$cookieStore',
    function($scope, $uibModal, $log, FileTransferService, SpecMarshallService,
        printingSchemas, PrintingSchemaService, $cookieStore) {

    /** Page range logic */
    $scope.showModal = false;
    $scope.lastItem = null;
    $scope.lastFile = null;

    $scope.specs = printingSchemas.data;

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

    $scope.request = function(){
        /** Send Request */
        FileTransferService.TransferFiles($scope.files(), function(){
            $scope.showRequest = false;
            $state.go('consumer.requestprintshopsbudget');
        });
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

    $scope.addRequestModal = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/components/consumer/views/request-modal.html',
            controller: 'SendRequestController',
            size: 'md',
            resolve: {
                files: function () {
                    return $scope.files();
                }
            }
        });

        modalInstance.result.then(function() {
            FileTransferService.TransferFiles($scope.files());
            $state.go('consumer.requestprintshopsbudget');
        });
    }

    $scope.addSpecModal = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/components/consumer/views/spec-modal.html',
            controller: 'AddSpecificationController',
            size: 'md'
        });

      modalInstance.result.then(function(spec) {
        var specification = SpecMarshallService.marshallSpecification(spec);
        if ($scope.specs == null){
          specification.fakeID = 1;
          $scope.specs = new Array();
        }
        else specification.fakeID = $scope.specs.length+1;
        $scope.addPrintingSchema(specification);
      });
    }

      $scope.removePrintingSchema = function (index) {
        PrintingSchemaService.deletePrintingSchema($scope.specs[index].id, $cookieStore.get('consumerID'));
        $scope.specs.splice(index,1);
      }

      $scope.addPrintingSchema = function (schema) {
        PrintingSchemaService.addPrintingSchema(schema, $cookieStore.get('consumerID'));
        $scope.specs.push(schema);
      }


}]);

angular.module('ProxyPrint').controller('AddSpecificationController', ['$scope', '$uibModalInstance',
  function ($scope, $uibModalInstance) {

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
}]);
