angular.module('ProxyPrint').controller('ConsumerSpecsController',
['$scope' , '$uibModal', '$log', 'fileTransferService', 'specMarshallService',
'printingSchemas', 'printingSchemaService', '$cookieStore', '$state', 'toasterService', 'usSpinnerService', 'requestHelperService',
function($scope, $uibModal, $log, fileTransferService, specMarshallService,
  printingSchemas, printingSchemaService, $cookieStore, $state, toasterService, usSpinnerService, requestHelperService) {

    /** Page range logic */
    $scope.lastItem = null;
    $scope.lastFile = null;
    $scope.specs = printingSchemas.data.pschemas;
    $scope.files = fileTransferService.getFiles;
    $scope.all = [];
    usSpinnerService.stop('consumer-spinner');

    $scope.addToAll = function(item, index) {
      var files = $scope.files();
      interval = "Completo";
      init=end=0;
      item.pages=interval;
      item.from = init;
      item.to = end;

      angular.forEach(files, function(file) {
        file.specs.push(item);
      });
      return item;
    };

    $scope.addPageModal = function(file, item) {
      $scope.lastItem = item;
      $scope.lastFile = file;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/consumer/views/pagerange-modal.html',
        controller: 'PageRangeController',
        size: 'md',
        resolve: {
          pages: ['$q', function ($q) {
            var deferred = $q.defer();
            fileTransferService.countPages($scope.lastFile, function (processedFiles) {
              deferred.resolve(processedFiles.pages);
            });
            return deferred.promise;
          }]
        }
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
          files[i].specs[index].from = init;
          files[i].specs[index].to = end;
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

    $scope.queueNumber = function (){
      var i = 0;
      angular.forEach($scope.files(), function(file){
        if(file.specs.length !== 0){
          i++;
        }
      });
      return i;
    };

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
        usSpinnerService.spin('consumer-spinner');
        fileTransferService.ProcessFiles($scope.files());
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
        addPrintingSchema(spec);
      });
    };

    $scope.editSpecModal = function (index) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/consumer/views/edit-spec-modal.html',
        controller: 'EditSpecificationController',
        size: 'md',
        resolve: {
          schema: function () {
            return $scope.specs[index];
          },
          id: function () {
            return $scope.specs[index].id;
          }
        }
      });


      modalInstance.result.then(function(spec) {
        editPrintingSchema(spec);
      });
    };

    /** C(R)UD PRINTING SCHEMA **/

    addPrintingSchema = function (spec) {
      var specification = specMarshallService.marshallSpecification(spec);
      console.log(specification);
      if ($scope.specs === null){
        specification.fakeID = 1;
        $scope.specs = [];
      }
      else specification.fakeID = $scope.specs.length+1;
      printingSchemaService.addPrintingSchema(specification, $cookieStore.get('consumerID'))
      .success(function (data) {
        specification.id = data.id;
        $scope.specs.push(specification);
        toasterService.notifySuccess("A especificação foi inserida!");
      }).error(function () {
        toasterService.notifyError("Ocorreu um erro! A especificação não foi inserida.");
      });
    };

    editPrintingSchema = function (spec) {
      var schema = specMarshallService.marshallEditedSpecification(spec);
      printingSchemaService.editPrintingSchema(spec.id, schema,$cookieStore.get('consumerID'))
      .success(function () {
        schema.fakeID = spec.fakeID;
        schema.id = spec.id;
        $scope.specs[spec.fakeID-1] = schema;
        toasterService.notifySuccess("A especificação foi editada com sucesso!");
      }).error(function () {
        toasterService.notifyError("Ocorreu um erro! A especificação não foi editada.");
      });
    };

    $scope.removePrintingSchema = function (index) {
      printingSchemaService.deletePrintingSchema($scope.specs[index].id, $cookieStore.get('consumerID'))
      .success(function (){
        $scope.specs.splice(index,1);
        toasterService.notifySuccess("A especificação foi removida!");
      }).error(function () {
        toasterService.notifyError("Ocorreu um erro! A especificação não foi removida.");
      });
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
      if($scope.cover) {
        spec.push($scope.cover+","+$scope.format);
      }
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

  angular.module('ProxyPrint').controller('PageRangeController', ['$scope', '$uibModalInstance', 'pages',
  function ($scope, $uibModalInstance, pages) {

    $scope.pageLimit = pages;

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

  angular.module('ProxyPrint').controller('EditSpecificationController',
  ['$scope', '$uibModalInstance', 'schema','id', 'specMarshallService',
  function ($scope, $uibModalInstance, schema, id, specMarshallService) {

    $scope.schema = specMarshallService.unmarshallSpecification(schema);
    $scope.schema.id = id;
    $scope.schema.fakeID = schema.fakeID;

    $scope.performAction = function () {
      $uibModalInstance.close($scope.schema);
    };

    $scope.closeModal = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }]);
