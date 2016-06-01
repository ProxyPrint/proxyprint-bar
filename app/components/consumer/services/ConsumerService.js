angular.module('ProxyPrint').factory('consumerService',['$http', 'backendURLService', function ($http, backendURLService) {

    var service = {};

    service.getConsumerInfo = function(printshopID) {
      return $http.get(backendURLService.getBaseURL()+'consumer/info').success(function(data){
        return data;
      });
    };

    service.updateConsumer = function(consumer) {
      return $http.put(backendURLService.getBaseURL()+'consumer/info/update').success(function(data){
        return data;
      });
    };

    return service;
}]);
