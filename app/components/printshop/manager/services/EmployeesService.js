var app = angular.module('ProxyPrint');

app.factory('employeesService', ['$http', '$cookieStore','backendURLService',function($http, $cookieStore,backendURLService) {
  var service = {};
  service.currentIndex = "";
  service.currentEmployee = {};

  service.getEmployeesList = function() {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees';
    return $http.get(url).success(function(response){
      return response;
    });
  };

  // add
  service.addEmployee = function(emp, successCallback, errorCallback) {
    service.currentEmployee = emp;
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees';
    return $http.post(url,emp).success(function(response){
      if(response.success) {
        successCallback(response);
      } else {
        return errorCallback(response);
      }
    });
  };

  // edit
  service.editEmployee = function(emp, successCallback, errorCallback) {
    service.currentEmployee = emp;
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees';
    return $http.put(url,emp).success(function(response){
      if(response.success) {
        successCallback(response);
      } else {
        return errorCallback(response);
      }
    });
  };

  // delete
  service.deleteEmployee = function(employeeID, successCallback, errorCallback) {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees/'+employeeID;
    return $http.delete(url).success(function(response){
      if(response.success) {
        successCallback(response);
      } else {
        errorCallback(response);
      }
    });
  };

  service.setCurrentIndex = function(index) {
    service.currentIndex = index;
  };

  service.getCurrentIndex = function() {
    return service.currentIndex;
  };

  service.setCurrentEmployee = function(emp) {
    service.currentEmployee = emp;
  };

  service.getCurrentEmployee = function() {
    return service.currentEmployee;
  };

  return service;
}]);
