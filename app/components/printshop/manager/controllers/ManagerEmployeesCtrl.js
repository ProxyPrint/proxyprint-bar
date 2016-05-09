angular.module('ProxyPrint').controller('ManagerEmployeesCtrl', ['$scope', '$state', 'employeesList', 'employeesService', '$uibModal',
function($scope, $state, employeesList, employeesService, $uibModal) {

  $scope.employees = employeesList.data.employees;

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
      var newEmployee = employeesService.getCurrentEmployee();
      console.log(newEmployee);
      var res = employeesService.addEmployee(newEmployee);
      if(res.success) {
        $scope.employees.push(employeesService.getCurrentEmployee());
        alert("Novo(a) funcionário(a) adicionado com sucesso!");
      } else {
        alert("Foi impossível criar um novo(a) funcionário(a). Por favor tente mais tarde.");
      }
    });
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
      var res = employeesService.deleteEmployee($scope.employees[index].id);
      if(res.success) {
        $scope.employees.splice(index,1);
        alert("Empregado removido com sucesso.");
      } else {
        alert("Foi impossível remover o empregado. Por favor tente mais tarde");
      }
    });
  };

}]);


/*------------------
Modals
------------------*/

// Modal for adding new employee
app.controller('NewEmployeeCtrl', function($scope, $uibModalInstance, text, employeesService) {

  $scope.text = text;

  $scope.addEmployee = function () {
    // Id is generated in server
    var newEmployee = {id: "", name: $scope.name, username: $scope.username, password: $scope.password };
    employeesService.setCurrentEmployee(newEmployee);
    $uibModalInstance.close();
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

// Modal for deleting an employee
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
