var app = angular.module('ProxyPrint');

app.factory('budgetService', ['$http', 'backendURLService', '$cookieStore', 'printShopListService', function($http, backendURLService, $cookieStore, printShopListService) {

  var service = {};

  service.getMeBudgetsForThis = function(printRequest) {
    var url = backendURLService.getBaseURL()+'consumer/budget';
    return $http.post(url,printRequest).success(function(response){
      if(response.success) {
        return response;
      } else {
        return null;
      }
    });
  };

  return service;

}]);
