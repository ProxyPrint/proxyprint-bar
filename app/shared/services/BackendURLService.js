angular.module('ProxyPrint').factory('backendURLService', [function() {

  var service = {};

  service.getBaseURL = function () {
    return '/api/';
  };

  return service;
}]);
