var app = angular.module('ProxyPrint');

app.controller('ManagerPriceTableCtrl', ['$scope', '$uibModal', 'PriceTableService', 'priceTable', function($scope, $uibModal, PriceTableService, priceTable) {

  $scope.priceTable = priceTable.data;

  $scope.staplingPrice = $scope.priceTable["stapling"];
  if($scope.priceTable["stapling"] > 0) {
    $scope.isStaplingFree = false;
  } else {
    $scope.isStaplingFree = true;
  }

  $scope.isEditModeOn = false;

  $scope.confirmDelete = function(table,index) {
    PriceTableService.setCurrentTable(table);
    PriceTableService.setCurrentRowIndex(index);
    $scope.openConfirmDeleteModal("Tem a certeza que pertende apagar esta linha do preçário?");
  };

  $scope.openConfirmDeleteModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/delete-row-modal.html',
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
      // Why is index undifined?
      index = PriceTableService.getCurrentRowIndex();
      var data = PriceTableService.deleteRow($scope.priceTable['printcopy'][PriceTableService.getCurrentTable()][index]);
      if(data.success) $scope.priceTable['printcopy'][PriceTableService.getCurrentTable()].splice(index, 1);
      else alert("Foi impossível remover o item desejado. Por favor tente mais tarde.");
    });
  };

  $scope.newEntryPrintCopyModal = function(table) {
    PriceTableService.setCurrentTable(table);
    $scope.openNewEntryPrintCopyModal("Nova entrada em impressões e cópias a preto e branco.");
  };

  $scope.openNewEntryPrintCopyModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/new-printcopy-row-modal.html',
      controller: 'NewPrintCopyEntryCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      $scope.priceTable['printcopy'][PriceTableService.getCurrentTable()].push(PriceTableService.getNewEntry());
      alert("Nova linha adicionada com sucesso!");
    });
  };

  $scope.editRow = function(table,index) {
    alert(Edit+" "+table+" "+index);
  };

  /*---------------------------------------
    Rings Table
  ----------------------------------------*/
  $scope.newEntryRingsModal = function(table) {
    PriceTableService.setCurrentTable(table);
    PriceTableService.setCurrentRingType($scope.priceTable['rings'][table][0].ringType);
    $scope.openNewRingsEntryModal("Nova entrada em encadernações, tabela de "+$scope.priceTable['rings'][table][0].ringType+".");
  };

  $scope.openNewRingsEntryModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/new-rings-row-modal.html',
      controller: 'NewRingsEntryCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      $scope.priceTable['rings'][PriceTableService.getCurrentTable()].push(PriceTableService.getNewEntry());
      alert("Nova linha adicionada com sucesso!");
    });
  };

  /*---------------------------------------
    Stapling
  ----------------------------------------*/
  $scope.editStaplingValue = function(newStaplingPrice) {
    if(newStaplingPrice!=0) {
      PriceTableService.editStaplingValue($scope.staplingPrice);
      alert("Agrafar tem agora um novo preço de "+$scope.staplingPrice+" €.");
    } else {
      PriceTableService.editStaplingValue(0);
      alert("Agrafar passa agora a ser grátis.");
    }
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
app.controller('NewPrintCopyEntryCtrl', function($scope, $uibModalInstance, text, PriceTableService) {

  $scope.text = text;

  $scope.addNewEntry = function () {
    var newEntry = {infLim: $scope.infLim, supLim: $scope.supLim, priceA4SIMPLEX: $scope.priceA4SIMPLEX, priceA4DUPLEX: $scope.priceA4DUPLEX, priceA3SIMPLEX: $scope.priceA3SIMPLEX, priceA3DUPLEX: $scope.priceA3DUPLEX, colors: PriceTableService.getCurrentTable()};

    PriceTableService.addNewRow(newEntry);

    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

// Modal for adding new ringsrelated rows to some table in the price table
app.controller('NewRingsEntryCtrl', function($scope, $uibModalInstance, text, PriceTableService) {

  $scope.text = text;

  $scope.addNewEntry = function () {
    var newEntry = {ringType: PriceTableService.getCurrentRingType(),infLim: $scope.infLim, supLim: $scope.supLim, price: $scope.price};
    console.log(newEntry);
    PriceTableService.addNewRingsRow(newEntry);

    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
