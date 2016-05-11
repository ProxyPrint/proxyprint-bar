var app = angular.module('ProxyPrint');

app.factory('budgetService', ['$http', 'backendURLService', '$cookieStore', 'printShopListService', function($http, backendURLService, $cookieStore, printShopListService) {

  var service = {};

  service.getMeBudgetsForThis = function(successCallback,errorCallback, printRequest) {
    var url = backendURLService.getBaseURL()+'consumer/budget';
    console.log(printRequest);
    console.log("Go budget...");
    return $http.post(url,printShopListService.getSelectedPrintShopsIDs()).success(function(response){
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