angular.module('ProxyPrint').factory('printshopService',['$http', 'backendURLService', function ($http, backendURLService) {

    var service = {};

    service.getAllPrintshops = function() {
      return $http.get(backendURLService.getBaseURL()+'printshops')
      .success(function(data){
        return data;
      });
    };


    service.getPrintshop = function (printshopID) {
      return $http.get(backendURLService.getBaseURL()+'printshops/'+printshopID)
        .success (function(data) {
          return data;
        });
    }

    service.getPrintshopPricetable = function (printshopID) {
      return $http.get(backendURLService.getBaseURL()+'printshops/'+printshopID+'/pricetable')
        .success (function (data) {
          return data;
        });
    }

    return service;
}]);
