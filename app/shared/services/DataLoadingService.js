angular.module('ProxyPrint').factory('dataLoadingService', ['$cookieStore', function($cookieStore) {

    var service = {};

    service.isDataLoading = function() {
      return $cookieStore.get("isDataLoading");
    };

    service.setDataLoading = function(v) {
      $cookieStore.put("isDataLoading", v);
    };

    return service;
}]);
