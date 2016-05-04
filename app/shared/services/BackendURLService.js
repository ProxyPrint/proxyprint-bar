angular.module('ProxyPrint').factory('backendURLService', [function() {

  var service = {};

  service.getBaseURL = function () {
    return 'http://localhost:8080/';
  }

  return service;
}]);
