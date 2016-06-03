var app = angular.module('ProxyPrint');

app.factory('budgetService', ['$http', 'backendURLService', '$cookieStore', 'printShopListService', 'Upload', '$timeout', function($http, backendURLService, $cookieStore, printShopListService, Upload, $timeout) {

  var service = {};

  service.getMeBudgetsForThis = function(successCallback, errorCallback, printRequest, files) {
    printRequest = new Blob([JSON.stringify(printRequest)], { type: "application/json" });
    Upload.upload({
      url: backendURLService.getBaseURL() + 'consumer/budget',
      data: {
        printRequest: printRequest,
        files: files
      }
    }).then(function (resp) {
      console.log(resp);
      // Persist budgets information
      $cookieStore.put("budgets", resp.data);
      successCallback();
    }, function (resp) {
      console.log('Response: ' + JSON.stringify(resp.data));
      errorCallback(resp.data);
    });
  };

  service.submitPrintRequest = function(printRequestID, params) {
    var url = backendURLService.getBaseURL()+"consumer/printrequest/"+printRequestID+"/submit";
    console.log(url);
    console.log(params);
    return $http.post(url,params);
  };

  service.getBudgets = function() {
    return $cookieStore.get("budgets");
  };

  return service;

}]);
