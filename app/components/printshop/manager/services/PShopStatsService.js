var app = angular.module('ProxyPrint');

app.factory('pshopStatsService', ['$http','backendURLService',function($http, backendURLService) {
  var service = {};

  service.getStats = function() {
    var url = backendURLService.getBaseURL()+'printshops/stats';
    return $http.get(url).success(function(response){
      return response;
    });
  };

  return service;
}]);
