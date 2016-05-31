var app = angular.module('ProxyPrint');

app.factory('historyPrintRequestsService', ['$http', 'backendURLService',
function($http,backendURLService) {
    var service = {};

    service.getHistoryRequests = function() {
        return $http.get(backendURLService.getBaseURL()+'printshops/history').success(function(data){
            return data;
        });
    };

    return service;
}]);
