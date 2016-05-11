var app = angular.module('ProxyPrint');

app.factory('budgetService', ['$http', 'backendURLService', '$cookieStore', function($http, backendURLService, $cookieStore) {

  var service = {};

  service.getMeBudgetsForThis = function(successCallback,errorCallback, printRequest) {
    var url = backendURLService.getBaseURL()+'consumer/budget';
    console.log("Go budget...");
    return $http.post(url,printRequest).success(function(response){
      console.log(response);
      if(response.success) {
        successCallback(response);
      } else {
        return errorCallback(response);
      }
    });
  };

  return service;

}]);
