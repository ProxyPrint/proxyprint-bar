angular.module('ProxyPrint').factory('managerPrintshopService',['$http', 'backendURLService', function ($http, backendURLService) {

    var service = {};

    service.getPrintshop = function () {
      return $http.get(backendURLService.getBaseURL()+'printshop')
        .success (function(data) {
          return data;
        });
    }

    return service;
}]);
