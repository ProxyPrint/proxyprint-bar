var app = angular.module('ProxyPrint');

app.factory('integrationBudgetService', ['$http', 'backendURLService', '$cookieStore', 'printShopListService', 'Upload', '$timeout', function($http, backendURLService, $cookieStore, printShopListService, Upload, $timeout) {

    var service = {};

    service.addPrintingSchema = function (schema, consumerID){
        return $http.post(backendURLService.getBaseURL()+'consumer/'+consumerID+'/printingschemas', schema);
    }


    /* É aqui tenho de mandar a lista de reprografias selecionadas. Nao estou a conseguir */

    service.getMeBudgetsForThis = function(successCallback, errorCallback, choosenPShopsIDs, id) {
        var data = $.param({
            printshops: choosenPShopsIDs,
        });
        $http({
            method: 'POST',
            url: backendURLService.getBaseURL() + 'printrecipe/' + id + '/budget',
            data: data
        }).success(function(resp) {
            if(resp.success) {
                console.log(resp);
                // Persist budgets information
                $cookieStore.put("budgets", resp.data);
                successCallback();
            } else {
                console.log('Response: ' + resp);
                errorCallback(resp.data);
            }
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
