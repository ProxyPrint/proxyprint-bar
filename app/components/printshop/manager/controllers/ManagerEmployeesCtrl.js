angular.module('ProxyPrint').controller('ManagerEmployeesCtrl', ['$scope', '$state', 'authenticationService',
function($scope, $state, authenticationService) {

  $scope.employees = [{"name":"Mafalda Sofia Pinto","id":4,"username":"mafalda","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Miguel Santos","id":5,"username":"miguel","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Ana Ferreira","id":6,"username":"ana","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Joana Sofia","id":7,"username":"joana","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Rita Semedo","id":8,"username":"rita","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Rafaela Martins","id":9,"username":"rafaela","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Cristiano Costa","id":10,"username":"cristiano","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Marco Pinheiro","id":11,"username":"marco","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Daniel Caldas","id":12,"username":"daniel","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Carlos do Mar","id":13,"username":"carlos","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Mário Pereira","id":14,"username":"mario","password":"1234","roles":["ROLE_EMPLOYEE"]},{"name":"Fábio Cruz","id":15,"username":"fabio","password":"1234","roles":["ROLE_EMPLOYEE"]}];

  $scope.filterEmployees = function(emp) {
    return (emp.name.match($scope.employeeSearch) || emp.username.match($scope.employeeSearch));
  };

}]);
