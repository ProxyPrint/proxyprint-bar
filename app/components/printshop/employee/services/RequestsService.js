var app = angular.module('ProxyPrint');

app.factory('PendingPrintRequestsService', ['$http', '$cookieStore', function($http, $cookieStore) {
  var service = {};
  service.currentRequest = {};

  service.getPendingRequests = function() {
    var url = "http://localhost:8080/printshops/" + $cookieStore.get("printShopID") + "/requests";
    return $http.get(url).success(function(data){
      return data;
    });
  };

  return service;
}]);
