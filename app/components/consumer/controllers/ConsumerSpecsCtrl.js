angular.module('ProxyPrint').controller('ConsumerSpecsController',
['$scope' , '$uibModal', '$log', 'fileTransferService', 'specMarshallService',
'printingSchemas', 'printingSchemaService', '$cookieStore', '$state',
function($scope, $uibModal, $log, fileTransferService, specMarshallService,
  printingSchemas, printingSchemaService, $cookieStore, $state) {

    /** Page range logic */
    $scope.lastItem = null;
    $scope.lastFile = null;
    $scope.specs = printingSchemas.data.pschemas;

    console.log($scope.specs);

    $scope.addPageModal = function(file, item) {
      $scope.lastItem = item;
      $scope.lastFile = file;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/consumer/views/pagerange-modal.html',
        controller: 'PageRangeController',
        size: 'md'
      });

      modalInstance.result.then(function (values) {
        // $modal.close() will get into here.
        var init = values[0];
        var end = values[1];
        var flag = values[2];
        var interval;

        if(flag == 'enc'){
          interval = init + ' - ' + end;
        }
        else {
          interval = "Completo";
          init=end=0;
        }

        var files = $scope.files();
        var i = files.indexOf($scope.lastFile);
        var index = files[i].specs.indexOf($scope.lastItem);
        if (index > -1) {
          files[i].specs[index].pages = interval;
          files[i].specs[index]['from'] = init;
          files[i].specs[index]['to'] = end;
        }
      }, function () {
        // dismissed here.
        $scope.remove($scope.lastFile, $scope.lastItem);
      });
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

    $scope.request = function(){
      /** Send Request */
      fileTransferService.ProcessFiles($scope.files(), function(){
        $scope.showRequest = false;
        $state.go('consumer.requestprintshopsbudget');
      });
    };

    $scope.queueNumber = function (){
      var i = 0;
      angular.forEach($scope.files(), function(file){
        if(file.specs.length !== 0){
          i++;
        }
      });
      return i;
    };

    /** Cancel request to add the file to queue */
    $scope.cancel = function (){
      $scope.remove($scope.lastFile, $scope.lastItem);
      $scope.showModal = false;
    };

    /** Add file to queue */
    $scope.submit = function(init, end, check){
      var interval;
      if(!check) {
        interval = init + ' - ' + end;
      }
      else {
        interval = "Completo";
        init = 0;
        end = 0;
      }

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
      fileTransferService.ProcessFiles($scope.files(), function(){
        $scope.showRequest = false;
        $state.go('consumer.printshopselection');
      });
    };

    $scope.queueNumber = function (){
      var i = 0;
      angular.forEach($scope.files(), function(file){
        if(file.specs.length !== 0){
          i++;
        }
      });
      return i;
    };

    $scope.files = fileTransferService.getFiles;

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
        fileTransferService.ProcessFiles($scope.files());
        $state.go('consumer.printshopselection');
      });
    };

    $scope.addSpecModal = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/consumer/views/spec-modal.html',
        controller: 'AddSpecificationController',
        size: 'md'
      });

      modalInstance.result.then(function(spec) {
        var specification = specMarshallService.marshallSpecification(spec);
        if ($scope.specs === null){
          specification.fakeID = 1;
          $scope.specs = [];
        }
        else specification.fakeID = $scope.specs.length+1;
        $scope.addPrintingSchema(specification);
      });
    };

    $scope.removePrintingSchema = function (index) {
      printingSchemaService.deletePrintingSchema($scope.specs[index].id, $cookieStore.get('consumerID'));
      $scope.specs.splice(index,1);
    };

    $scope.addPrintingSchema = function (schema) {
      printingSchemaService.addPrintingSchema(schema, $cookieStore.get('consumerID'));
      $scope.specs.push(schema);
    };

  }]);

  angular.module('ProxyPrint').controller('AddSpecificationController', ['$scope', '$uibModalInstance',
  function ($scope, $uibModalInstance) {

    $scope.performAction = function () {
      var spec = [];
      spec.push($scope.name);
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

  angular.module('ProxyPrint').controller('SendRequestController', ['$scope', '$uibModalInstance', 'files', function ($scope, $uibModalInstance, files) {

    $scope.files = files;

    $scope.performAction = function () {
      $uibModalInstance.close();
    };

    $scope.closeModal = function () {
      $uibModalInstance.dismiss();
    };
  }]);

  angular.module('ProxyPrint').controller('PageRangeController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

    $scope.performAction = function () {
      var values = [];
      values.push($scope.init);
      values.push($scope.end);
      values.push($scope.content);
      $uibModalInstance.close(values);
    };

    $scope.closeModal = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);
