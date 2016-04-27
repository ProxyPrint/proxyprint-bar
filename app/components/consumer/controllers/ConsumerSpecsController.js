angular.module('ProxyPrint').controller('ConsumerSpecsController', ['$scope' , '$uibModal', '$log', 'FileTransferService', '$state', function($scope, $uibModal, $log, FileTransferService, $state) {

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

    $scope.addSpecModal = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/consumer/views/spec-modal.html',
        controller: 'AddSpecificationController',
        size: 'md'
      });

      modalInstance.result.then(function(spec) {
        var format, sides, colors,name;

        name = spec[0];
        format = spec[1];
        sides = spec[2];
        colors = spec[3];

        if (spec[4]==null){
          console.log(name+": Solto..");
          console.log(format+", "+sides+", "+colors);
        }

        else {
          if (spec[5]==null && spec[6]==null){
            console.log(name+": Agrafar");
            console.log(format+", "+sides+", "+colors);
          }
          else {
            var cover, args;
            cover = spec[5];
            args = spec[6];
            console.log(name+": Encadernar...");
            console.log(format+", "+sides+", "+colors);
            console.log(cover+", "+args);
          }
        }
      });
    }
    $scope.specs = {
        list: [
            {
                id: 1,
                format: "A4",
                sides: "Frente e Verso",
                colors: "Preto e Branco",
                finishes: "Agrafar",
                opt: {
                    cover: null,
                    rings: null,
                }
            }, {
                id: 2,
                format: "A5",
                sides: "Frente e Verso",
                colors: "Cores",
                finishes: "Encadernar",
                opt: {
                    cover: "PVC Opaco",
                    rings: "Espiral"
                }
            }, {
                id: 3,
                format: "A3",
                sides: "Frente e Verso",
                colors: "Cores",
                finishes: "Encadernar",
                opt: {
                    cover: "PVC Opaco",
                    rings: "Espiral"
                }
            }
        ]
    };
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
    spec.push($scope.args);
    $uibModalInstance.close(spec);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
