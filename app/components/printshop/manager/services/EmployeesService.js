var app = angular.module('ProxyPrint');

app.factory('employeesService', ['$http', '$cookieStore','backendURLService',function($http, $cookieStore,backendURLService) {
  var service = {};
  service.currentIndex = "";

  service.getEmployeesList = function() {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees';
    return $http.get(url).success(function(response){
      return response;
    });
  };

  service.deleteEmployee = function(employeeID) {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees/'+employeeID;
    return $http.delete(url).success(function(response){
      return response;
    });
  };

  service.setCurrentIndex = function(index) {
    service.currentIndex = index;
  };

  service.getCurrentIndex = function() {
    return service.currentIndex;
  };

  return service;
}]);
