angular.module('ProxyPrint').factory('managerPrintshopService',['$http', 'backendURLService', '$cookieStore', function ($http, backendURLService, $cookieStore) {

    var service = {};

    service.getPrintshop = function () {
      return $http.get(backendURLService.getBaseURL()+'printshop')
        .success (function(data) {
          return data;
        });
    }

    service.getPrintshopReviews = function(printshopID) {
      return $http.get(backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/reviews')
      .success(function(data){
        return data;
      });
    };

    return service;
}]);
