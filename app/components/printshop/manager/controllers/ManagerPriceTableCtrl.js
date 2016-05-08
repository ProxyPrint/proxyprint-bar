var app = angular.module('ProxyPrint');

app.controller('ManagerPriceTableCtrl', ['$scope', '$uibModal', 'priceTableService', 'priceTable', function($scope, $uibModal, priceTableService, priceTable) {

  $scope.priceTable = priceTable.data;

  $scope.staplingPrice = $scope.priceTable.stapling;
  if($scope.priceTable.stapling > 0) {
    $scope.isStaplingFree = false;
  } else {
    $scope.isStaplingFree = true;
  }

  /*---------------------------------------
  Print&Copy
  ----------------------------------------*/

  // add
  $scope.newEntryPrintCopyModal = function(table) {
    priceTableService.setCurrentTable(table);
    if(!$scope.priceTable.printcopy[priceTableService.getCurrentTable()]) {
      $scope.priceTable.printcopy[priceTableService.getCurrentTable()] = [];
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
      $scope.priceTable.printcopy[priceTableService.getCurrentTable()].push(priceTableService.getNewEntry());
      $scope.messageModal("Nova linha adicionada com sucesso!");
    });
  };

  // edit
  $scope.editRowPaper = function(table,index) {
    priceTableService.setCurrentTable(table);
    priceTableService.setCurrentRowIndex(index);
    priceTableService.setCurrentEntry($scope.priceTable.printcopy[table][index]);
    $scope.openEditPrintCopyEntryCtrl("Editar entrada em impressões e cópias a preto e branco.");
  };

  $scope.openEditPrintCopyEntryCtrl = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/edit-printcopy-row-modal.html',
      controller: 'EditPrintCopyEntryCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      $scope.priceTable.printcopy[priceTableService.getCurrentTable()][priceTableService.getCurrentRowIndex()] = priceTableService.getNewEntry();
      $scope.messageModal("Linha editada com sucesso!");
    });
  };

  // delete
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
      index = priceTableService.getCurrentRowIndex();
      var data = priceTableService.deletePaperRow($scope.priceTable.printcopy[priceTableService.getCurrentTable()][index]);
      if(data.success){
        $scope.priceTable.printcopy[priceTableService.getCurrentTable()].splice(index, 1);
        $scope.messageModal("O item foi removido.");
      }
      else $scope.messageModal("Foi impossível remover o item desejado. Por favor tente mais tarde.");
    });
  };


  /*---------------------------------------
  Rings Table
  ----------------------------------------*/

  // add
  $scope.newEntryRingsModal = function(table) {
    priceTableService.setCurrentTable(table);
    priceTableService.setCurrentRingType(table);
    if(!$scope.priceTable.rings[priceTableService.getCurrentTable()]) {
      $scope.priceTable.rings[priceTableService.getCurrentTable()] = [];
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
      $scope.priceTable.rings[priceTableService.getCurrentTable()].push(priceTableService.getNewEntry());
      $scope.messageModal("Nova linha adicionada com sucesso!");
    });
  };

  // edit
  $scope.editRowRings = function(table,index) {
    priceTableService.setCurrentRingType(table);
    priceTableService.setCurrentTable(table);
    priceTableService.setCurrentRowIndex(index);
    priceTableService.setCurrentEntry($scope.priceTable.rings[table][index]);
    $scope.openEditRingsEntryModal("Editar entrada em encadernações, tabela de "+priceTableService.getPresentationStringForRings(table)+".");
  };

  $scope.openEditRingsEntryModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/edit-rings-row-modal.html',
      controller: 'EditRingsEntryCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      $scope.priceTable.rings[priceTableService.getCurrentTable()][priceTableService.getCurrentRowIndex()] = priceTableService.getNewEntry();
      $scope.messageModal("Item editado com sucesso!");
    });
  };

  // delete
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
      index = priceTableService.getCurrentRowIndex();
      var data = priceTableService.deleteRingRow($scope.priceTable.rings[priceTableService.getCurrentTable()][index]);
      if(data.success){
        $scope.priceTable.rings[priceTableService.getCurrentTable()].splice(index, 1);
        $scope.messageModal("O item foi removido.");
      }
      else $scope.messageModal("Foi impossível remover o item desejado. Por favor tente mais tarde.");
    });
  };


  /*---------------------------------------
  Covers Table
  ----------------------------------------*/
  $scope.getPresentationStringForCovers = function(key) {
    return priceTableService.getPresentationStringForCovers(key);
  }

  $scope.totalCoversTypes = 3;

  $scope.sizeOfCoversTable = function() {
    if(!$scope.priceTable.covers) return 0;
    var i=0;
    for(var c in $scope.priceTable.covers) i++;
    return i;
  };

  // add
  $scope.newEntryCoverModal = function(table) {
    if(!$scope.priceTable.covers) {
      $scope.priceTable.covers = [];
    }
    // Create options array with remain covers
    var allOptions = priceTableService.getAllCoverOptions();
    var usedOptions = [];
    for(var c in $scope.priceTable.covers) {
      usedOptions.push(c);
    }
    var remainOptions = arr_diff(allOptions,usedOptions);
    priceTableService.setCoversOptions(remainOptions);
    $scope.openNewCoverEntryModal("Nova entrada em capas de encadernação.");
  };

  $scope.openNewCoverEntryModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/new-cover-row-modal.html',
      controller: 'NewCoverEntryCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      $scope.priceTable.covers[priceTableService.getNewEntry().coverType] = priceTableService.getNewEntry();
      $scope.messageModal("Nova linha adicionada com sucesso!");
    });
  };

  function arr_diff (a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
  }

  // delete
  $scope.confirmCoverDelete = function(cover) {
    priceTableService.setCurrentTable(cover);
    $scope.openConfirmCoverDeleteModal("Tem a certeza que pertende apagar esta linha do preçário?");
  };

  $scope.openConfirmCoverDeleteModal = function(reply) {
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
      var data = priceTableService.deleteCoverRow($scope.priceTable.covers[priceTableService.getCurrentTable()]);
      if(data.success){
        delete $scope.priceTable.covers[priceTableService.getCurrentTable()];
        $scope.messageModal("O item foi removido.");
      }
      else $scope.messageModal("Foi impossível remover o item desejado. Por favor tente mais tarde.");
    });
  };

  /*---------------------------------------
  Stapling
  ----------------------------------------*/
  $scope.editStaplingValue = function(newStaplingPrice) {
    if(newStaplingPrice===0) {
      $scope.isStaplingFree = true;
      priceTableService.editStaplingValue(0);
      $scope.priceTable.stapling = 0;
      $scope.messageModal("Agrafar passa agora a ser grátis.");
    }
    else if(newStaplingPrice==-1) {
      $scope.isStaplingFree = false;
    }
    else {
      $scope.isStaplingFree = false;
      priceTableService.editStaplingValue($scope.staplingPrice);
      $scope.messageModal("Agrafar tem agora um novo preço de "+$scope.staplingPrice+" €.");
    }
  };

  // General purpose message
  $scope.messageModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/pricetable/modals/message-modal.html',
      controller: 'MessageModal',
      size: 'sm',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
  };

}]);


/*---------------------------------------
Modals
----------------------------------------*/

/*---------------------------------------
Print&Copy
----------------------------------------*/
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

// Modal for editing new print and copy related rows to some table in the price table
app.controller('EditPrintCopyEntryCtrl', function($scope, $uibModalInstance, text, priceTableService) {

  $scope.text = text;
  var current = priceTableService.getCurrentEntry();
  $scope.infLim = current.infLim;
  $scope.supLim = current.supLim;
  $scope.priceA4SIMPLEX = parseFloat(current.priceA4SIMPLEX);
  $scope.priceA4DUPLEX = parseFloat(current.priceA4DUPLEX);
  $scope.priceA3SIMPLEX = parseFloat(current.priceA3SIMPLEX);
  $scope.priceA3DUPLEX = parseFloat(current.priceA3DUPLEX);

  $scope.editEntry = function () {
    var editedEntry = {infLim: $scope.infLim, supLim: $scope.supLim, priceA4SIMPLEX: $scope.priceA4SIMPLEX, priceA4DUPLEX: $scope.priceA4DUPLEX, priceA3SIMPLEX: $scope.priceA3SIMPLEX, priceA3DUPLEX: $scope.priceA3DUPLEX, colors: priceTableService.getCurrentTable()};
    priceTableService.editPaperRow(editedEntry);
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.itemHasChanged = function() {
    return ($scope.infLim===current.infLim && $scope.supLim===current.supLim && $scope.priceA4SIMPLEX===parseFloat(current.priceA4SIMPLEX) &&
    $scope.priceA4DUPLEX===parseFloat(current.priceA4DUPLEX) &&
    $scope.priceA3SIMPLEX===parseFloat(current.priceA3SIMPLEX) && $scope.priceA3DUPLEX===parseFloat(current.priceA3DUPLEX));
  };

});


/*---------------------------------------
Rings
----------------------------------------*/
// Modal for adding new rings related rows to some table in the price table
app.controller('NewRingsEntryCtrl', function($scope, $uibModalInstance, text, priceTableService) {

  $scope.text = text;

  $scope.addNewEntry = function () {
    var newEntry = {ringType: priceTableService.getCurrentRingType(),infLim: $scope.infLim, supLim: $scope.supLim, price: $scope.price};
    priceTableService.addNewRingsRow(newEntry);
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

// Modal for editing rings related rows to some table in the price table
app.controller('EditRingsEntryCtrl', function($scope, $uibModalInstance, text, priceTableService) {

  $scope.text = text;
  var current = priceTableService.getCurrentEntry();
  $scope.infLim = current.infLim;
  $scope.supLim = current.supLim;
  $scope.price = parseFloat(current.price);

  $scope.editEntry = function () {
    var editedEntry = {ringType: priceTableService.getCurrentRingType(),infLim: $scope.infLim, supLim: $scope.supLim, price: $scope.price};
    priceTableService.editRingsRow(editedEntry);
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.itemHasChanged = function() {
    return ($scope.infLim===current.infLim && $scope.supLim===current.supLim && $scope.price===parseFloat(current.price));
  };

});


/*---------------------------------------
Covers
----------------------------------------*/

// Modal for adding new cover related rows to some table in the price table
app.controller('NewCoverEntryCtrl', function($scope, $uibModalInstance, text, priceTableService) {

  $scope.text = text;
  $scope.covers = priceTableService.getCoversOptions();

  $scope.getPresentationStringForCovers = function(key) {
    return priceTableService.getPresentationStringForCovers(key);
  };

  $scope.addNewEntry = function (coverType) {
    var newEntry = { coverType: $scope.selectedCoverType, priceA4: $scope.priceA4, priceA3: $scope.priceA3 };
    console.log(newEntry);
    priceTableService.addNewCoverRow(newEntry);
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});


/*---------------------------------------
General
----------------------------------------*/

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

// General purpose modal message
app.controller('MessageModal', function($scope, $uibModalInstance, text) {
  $scope.text = text;
  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
