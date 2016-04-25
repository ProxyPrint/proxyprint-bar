var app = angular.module('ProxyPrint');

app.controller('ManagerPriceTableCtrl', ['$scope', '$uibModal', 'PriceTableService', function($scope, $uibModal, PriceTableService) {

  $scope.priceTable = PriceTableService.getPriceTable();

  $scope.isStaplingFree = true;

  $scope.confirmDelete = function(table,index) {
    PriceTableService.setCurrentTable(table);
    console.log("CUR "+PriceTableService.getCurrentTable());
    $scope.openConfirmModal("Tem a certeza que pertende apagar esta linha do preçário?");
  };

  $scope.openConfirmModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/delete-row-modal.html',
      controller: 'ConfirmDeleteModalCtrl',
      size: 'sm',
      resolve: {
        index: function() {
          return $scope.index;
        },
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      PriceTableService.deleteRow(index);
    });
  };

  $scope.openNewEntryPrintCopyModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/new-printcopy-row-modal.html',
      controller: 'NewPrintCopyEntryCtrl',
      size: 'sm',
      resolve: {
        index: function() {
          return $scope.index;
        },
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      // do stuff
    });
  };

}]);

// Modal for deleting a row of certain table from price table
app.controller('ConfirmDeleteModalCtrl', function($scope, $uibModalInstance, index, text) {

  $scope.index = index;
  $scope.text = text;

  $scope.confirmDeleteRow = function () {
    $uibModalInstance.close($scope.index);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

// Modal for adding new print and copy related rows to some table in the price table
app.controller('NewPrintCopyEntryCtrl', function($scope, $uibModalInstance, index, text) {

  $scope.index = index;
  $scope.text = text;

  $scope.confirmDeleteRow = function () {
    $uibModalInstance.close($scope.index);
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
