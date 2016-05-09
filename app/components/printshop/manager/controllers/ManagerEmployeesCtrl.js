angular.module('ProxyPrint').controller('ManagerEmployeesCtrl', ['$scope', '$state', 'employeesList', 'employeesService', '$uibModal',
function($scope, $state, employeesList, employeesService, $uibModal) {

  $scope.employees = employeesList.data.employees;

  $scope.filterEmployees = function(emp) {
    return (emp.name.match($scope.employeeSearch) || emp.username.match($scope.employeeSearch));
  };

  // CRUD operations

  // add
  $scope.newEmployee = function() {
    alert("new emp");
  };

  // delete
  $scope.confirmDelete = function(index) {
    employeesService.setCurrentIndex(index);
    $scope.openConfirmDeleteModal("Tem a certeza que pertende eliminar este empregado?");
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
