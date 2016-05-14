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

  service.submitPrintRequest = function(successCallback, errorCallback, printRequestID, params) {
    console.log(params);
    var url = backendURLService.getBaseURL()+"/consumer/printrequest/"+printRequestID+"/submit";
    return $http.post(url,params).success(function(response) {
      if(response.success) successCallback(response);
      else errorCallback(response);
    });
  };

  return service;

}]);
