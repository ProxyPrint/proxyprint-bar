var app = angular.module('ProxyPrint');

app.factory('integrationBudgetService', ['$http', 'backendURLService', '$cookieStore', 'printShopListService', 'Upload', '$timeout', function($http, backendURLService, $cookieStore, printShopListService, Upload, $timeout) {

    var service = {};

    service.addPrintingSchema = function (schema, consumerID){
        return $http.post(backendURLService.getBaseURL()+'consumer/'+consumerID+'/printingschemas', schema);
    }

    /* É aqui tenho de mandar a lista de reprografias selecionadas. Nao estou a conseguir */

    service.getMeBudgetsForThis = function(successCallback, errorCallback, printshops, id) {
        $http.post(backendURLService.getBaseURL() + 'printdocument/' + id + '/budget', printshops).success(function (resp) {
            // Persist budgets information
            $cookieStore.put("budgets", resp);
            successCallback();
        }, function (resp) {
            errorCallback(resp);
        });
    };

    service.getBudgets = function() {
        return $cookieStore.get("budgets");
    };

    return service;

}]);
