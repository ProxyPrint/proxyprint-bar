var app = angular.module('ProxyPrint');

app.factory('PendingRequestsService', ['$http', function($http) {
  var service = {};
  service.currentRequest = {};

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

  service.rejectRequest = function(id) {
    var url = "http://localhost:8080/request/reject/"+id;
    return $http.post(url).success(function(data){
      return data;
    });
  };

  service.setCurrentRequest = function(request) {
    service.currentRequest = request;
  };

  service.getCurrentRequest = function() {
    return service.currentRequest;
  };

  return service;
}]);
