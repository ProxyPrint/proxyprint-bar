angular.module('ProxyPrint').controller('ManagerEmployeesCtrl', ['$scope', '$state', 'employeesList',
function($scope, $state, employeesList) {

  $scope.employees = employeesList.data.employees;

  $scope.filterEmployees = function(emp) {
    return (emp.name.match($scope.employeeSearch) || emp.username.match($scope.employeeSearch));
  };

  $scope.newEmployee = function() {
    alert("new emp");
  };

}]);
