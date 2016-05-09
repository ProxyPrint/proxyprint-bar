var app = angular.module('ProxyPrint');

app.factory('employeesService', ['$http', '$cookieStore','backendURLService',function($http, $cookieStore,backendURLService) {
  var service = {};

  service.getEmployeesList = function() {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees';
    console.log("getEmployeesList");
    return $http.get(url).success(function(response){
      return response;
    });
  };

  return service;
}]);
