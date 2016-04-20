var app = angular.module('ProxyPrint');

app.factory('PendingRequestsService', ['$http', function($http) {
  var service = {};

  service.getPendingRequests = function() {
    return $http.get('http://localhost:8080/requests/pending').success(function(data){
      return data;
    });
  };

  service.acceptRequest = function(id) {
    var url = "http://localhost:8080/request/accept/"+id;
    return $http.post(url).success(function(data){
      return data;
    });
  };

  return service;
}]);
