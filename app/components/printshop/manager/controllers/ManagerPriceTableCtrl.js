var app = angular.module('ProxyPrint');

app.controller('ManagerPriceTableCtrl', ['$scope', '$uibModal', 'priceTableService', 'priceTable', function($scope, $uibModal, priceTableService, priceTable) {

  $scope.priceTable = priceTable.data;

  $scope.staplingPrice = $scope.priceTable["stapling"];
  if($scope.priceTable["stapling"] > 0) {
    $scope.isStaplingFree = false;
  } else {
    $scope.isStaplingFree = true;
  }
  console.log($scope.priceTable);
  $scope.isEditModeOn = false;

  $scope.confirmDelete = function(table,index) {
    priceTableService.setCurrentTable(table);
    priceTableService.setCurrentRowIndex(index);
    $scope.openConfirmDeleteModal("Tem a certeza que pertende apagar esta linha do preçário?");
  };

  $scope.openConfirmDeleteModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/delete-row-modal.html',
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
      index = priceTableService.getCurrentRowIndex();
      var data = priceTableService.deletePaperRow($scope.priceTable['printcopy'][priceTableService.getCurrentTable()][index]);
      if(data.success) $scope.priceTable['printcopy'][priceTableService.getCurrentTable()].splice(index, 1);
      else alert("Foi impossível remover o item desejado. Por favor tente mais tarde.");
    });
  };

  $scope.newEntryPrintCopyModal = function(table) {
    priceTableService.setCurrentTable(table);
    if(!$scope.priceTable['printcopy'][priceTableService.getCurrentTable()]) {
      $scope.priceTable['printcopy'][priceTableService.getCurrentTable()] = [];
    }
    $scope.openNewEntryPrintCopyModal("Nova entrada em impressões e cópias a preto e branco.");
  };

  $scope.openNewEntryPrintCopyModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/new-printcopy-row-modal.html',
      controller: 'NewPrintCopyEntryCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      $scope.priceTable['printcopy'][priceTableService.getCurrentTable()].push(priceTableService.getNewEntry());
      alert("Nova linha adicionada com sucesso!");
    });
  };

  $scope.editRow = function(table,index) {
    alert(Edit+" "+table+" "+index);
  };

  /*---------------------------------------
  Rings Table
  ----------------------------------------*/

  // Add
  $scope.newEntryRingsModal = function(table) {
    priceTableService.setCurrentTable(table);
    priceTableService.setCurrentRingType(table);
    if(!$scope.priceTable['rings'][priceTableService.getCurrentTable()]) {
      $scope.priceTable['rings'][priceTableService.getCurrentTable()] = [];
    }
    $scope.openNewRingsEntryModal("Nova entrada em encadernações, tabela de "+priceTableService.getPresentationStringForRings(table)+".");
  };

  $scope.openNewRingsEntryModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/new-rings-row-modal.html',
      controller: 'NewRingsEntryCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      $scope.priceTable['rings'][priceTableService.getCurrentTable()].push(priceTableService.getNewEntry());
      alert("Nova linha adicionada com sucesso!");
    });
  };

  // Delete
  $scope.confirmRingDelete = function(table,index) {
    priceTableService.setCurrentTable(table);
    priceTableService.setCurrentRowIndex(index);
    $scope.openConfirmRingDeleteModal("Tem a certeza que pertende apagar esta linha do preçário?");
  };

  $scope.openConfirmRingDeleteModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/delete-row-modal.html',
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
      index = priceTableService.getCurrentRowIndex();
      var data = priceTableService.deleteRingRow($scope.priceTable['rings'][priceTableService.getCurrentTable()][index]);
      if(data.success) $scope.priceTable['rings'][priceTableService.getCurrentTable()].splice(index, 1);
      else alert("Foi impossível remover o item desejado. Por favor tente mais tarde.");
    });
  };

  /*---------------------------------------
  Stapling
  ----------------------------------------*/
  $scope.editStaplingValue = function(newStaplingPrice) {
    if(newStaplingPrice==0) {
      $scope.isStaplingFree = true;
      priceTableService.editStaplingValue(0);
      $scope.priceTable["stapling"] = 0;
      alert("Agrafar passa agora a ser grátis.");
    }
    else if(newStaplingPrice==-1) {
      $scope.isStaplingFree = false;
    }
    else {
      $scope.isStaplingFree = false;
      priceTableService.editStaplingValue($scope.staplingPrice);
      alert("Agrafar tem agora um novo preço de "+$scope.staplingPrice+" €.");
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
app.controller('NewPrintCopyEntryCtrl', function($scope, $uibModalInstance, text, priceTableService) {

  $scope.text = text;

  $scope.addNewEntry = function () {
    var newEntry = {infLim: $scope.infLim, supLim: $scope.supLim, priceA4SIMPLEX: $scope.priceA4SIMPLEX, priceA4DUPLEX: $scope.priceA4DUPLEX, priceA3SIMPLEX: $scope.priceA3SIMPLEX, priceA3DUPLEX: $scope.priceA3DUPLEX, colors: priceTableService.getCurrentTable()};

    priceTableService.addNewPaperRow(newEntry);

    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

// Modal for adding new rings related rows to some table in the price table
app.controller('NewRingsEntryCtrl', function($scope, $uibModalInstance, text, priceTableService) {

  $scope.text = text;

  $scope.addNewEntry = function () {
    var newEntry = {ringType: priceTableService.getCurrentRingType(),infLim: $scope.infLim, supLim: $scope.supLim, price: $scope.price};
    console.log(newEntry);
    priceTableService.addNewRingsRow(newEntry);

    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
