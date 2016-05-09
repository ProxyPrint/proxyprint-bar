var app = angular.module('ProxyPrint');

app.factory('employeesService', ['$http', '$cookieStore','backendURLService',function($http, $cookieStore,backendURLService) {
  var service = {};

  service.getPriceTable = function() {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/employees';
    return $http.get(url).success(function(data){
      return data;
    });
  };

  return service;
}]);
