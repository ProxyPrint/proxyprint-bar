var app = angular.module('ProxyPrint');

app.factory('pendingRequestsService', ['$http', 'backendURLService', function($http, backendURLService) {
  var service = {};
  service.currentRequest = {};

  service.getPendingRequests = function() {
    return $http.get(backendURLService.getBaseURL()+'requests/pending').success(function(data){
      console.log(data);
      return data;
    });
  };

  service.acceptRequest = function(id) {
    var url = "http://localhost:8080/request/accept/"+id;
    return $http.post(url).success(function(data){
      return data;
    });
  };

  service.rejectRequest = function(id,motive) {
    var params = { motive: motive };
    var url = "http://localhost:8080/request/reject/"+id;
    return $http.post(url,params).success(function(data){
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
