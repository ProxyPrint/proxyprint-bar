var app = angular.module('ProxyPrint');

app.controller('ManagerEmployeesCtrl', ['$scope', '$state', 'employeesList', 'employeesService', '$uibModal', 'paginationService', 'toasterService',
function($scope, $state, employeesList, employeesService, $uibModal, paginationService, toasterService) {

  $scope.employees = employeesList.data.employees;

  $scope.paginationOn = true;
  $scope.pagination = paginationService.getNew(10);
  $scope.pagination.numPages = Math.ceil($scope.employees.length/$scope.pagination.perPage);

  $scope.filterEmployees = function(emp) {
    return (emp.name.match($scope.employeeSearch) || emp.username.match($scope.employeeSearch));
  };

  // CRUD operations

  // add
  $scope.newEmployee = function() {
    if(!$scope.employees) {
      $scope.employees = [];
    }
    $scope.openNewEmployeeModal("Novo registo de funcionário(a).");
  };

  $scope.openNewEmployeeModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/employees/new-employee-modal.html',
      controller: 'NewEmployeeCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      employeesService.addEmployee(employeesService.getCurrentEmployee(), $scope.newEmployeeSuccessCallback, $scope.newEmployeeErrorCallback);
    });
  };

  $scope.newEmployeeSuccessCallback = function(data) {
    var newEmployee = employeesService.getCurrentEmployee();
    newEmployee.id = data.id;
    $scope.employees.push(newEmployee);
    toasterService.notifySuccess("Novo(a) funcionário(a) adicionado com sucesso!");
  };

  $scope.newEmployeeErrorCallback = function(data) {
    if(data.message) {
      toasterService.notifyError("Impossível adicionar empregado. Motivo: "+data.message+". Por favor tente mais tarde.");
    } else {
      toasterService.notifyError("Impossível adicionar empregado. Por favor tente mais tarde.");
    }
  };

  // edit
  $scope.editEmployee = function(index) {
    employeesService.setCurrentIndex(index);
    employeesService.setCurrentEmployee($scope.employees[index]);
    $scope.openEditEmployeeModal("Edição de registo de funcionário(a).");
  };

  $scope.openEditEmployeeModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/employees/edit-employee-modal.html',
      controller: 'EditEmployeeCtrl',
      size: 'md',
      resolve: {
        text: function() {
          return reply;
        }
      }
    });
    modalInstance.result.then(function(index) {
      employeesService.editEmployee(employeesService.getCurrentEmployee(), $scope.editEmployeeSuccessCallback, $scope.editEmployeeErrorCallback);
    });
  };

  $scope.editEmployeeSuccessCallback = function(data) {
    var editedEmployee = employeesService.getCurrentEmployee();
    $scope.employees[employeesService.getCurrentIndex()] = editedEmployee;
    toasterService.notifySuccess("Funcionário(a) editado(a) com sucesso.");
  };

  $scope.editEmployeeErrorCallback = function(data) {
    if(data.message) {
      toasterService.notifyError("Impossível editar empregado. Motivo: "+data.message+". Por favor tente mais tarde.");
    } else {
      toasterService.notifyError("Impossível editar empregado. Por favor tente mais tarde.");
    }
  };

  // delete
  $scope.confirmDelete = function(index) {
    employeesService.setCurrentIndex(index);
    $scope.openConfirmDeleteModal("Tem a certeza que pertende eliminar este funcionário?");
  };

  $scope.openConfirmDeleteModal = function(reply) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/components/printshop/manager/views/employees/delete-employee-modal.html',
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
      index = employeesService.getCurrentIndex();
      employeesService.deleteEmployee($scope.employees[index].id, $scope.deleteSuccessCallback, $scope.deleteErrorCallback);
    });
  };

  $scope.deleteSuccessCallback = function(data) {
    index = employeesService.getCurrentIndex();
    $scope.employees.splice(index,1);
    toasterService.notifySuccess("Empregado removido com sucesso.");
  };

  $scope.deleteErrorCallback = function(data) {
    toasterService.notifyError("Foi impossível remover o empregado. Por favor tente mais tarde");
  };

}]);


/*------------------
Modals
------------------*/

// Modal for adding new employee
app.controller('NewEmployeeCtrl', ['$scope', '$uibModalInstance', 'text', 'employeesService', function($scope, $uibModalInstance, text, employeesService) {

  $scope.text = text;

  $scope.addEmployee = function () {
    // id is generated in server
    var newEmployee = { name: $scope.name, username: $scope.username, password: $scope.password };
    employeesService.setCurrentEmployee(newEmployee);
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);

// Modal for editing new employee
app.controller('EditEmployeeCtrl', ['$scope', '$uibModalInstance', 'text', 'employeesService', function($scope, $uibModalInstance, text, employeesService) {

  $scope.text = text;
  var currentEmployee = employeesService.getCurrentEmployee();
  $scope.id = currentEmployee.id;
  $scope.name = currentEmployee.name;
  $scope.username = currentEmployee.username;
  $scope.password = currentEmployee.password;

  $scope.editEmployee = function () {
    // Need to pass id for edition on server
    var editedEmployee = { id: $scope.id, name: $scope.name, username: $scope.username, password: $scope.password };
    employeesService.setCurrentEmployee(editedEmployee);
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);

// Modal for deleting an employee
app.controller('ConfirmDeleteModalCtrl', ['$scope', '$uibModalInstance', 'index', 'text', function($scope, $uibModalInstance, index, text) {
  $scope.index = index;
  $scope.text = text;
  $scope.confirmDeleteRow = function () {
    $uibModalInstance.close($scope.index);
  };
  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);
