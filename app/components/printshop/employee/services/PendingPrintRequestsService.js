var app = angular.module('ProxyPrint');

app.factory('pendingPrintRequestsService', ['$http', function($http) {
    var service = {};
    service.currentRequest = {};

    service.getPendingRequests = function() {
        return $http.get(BackendURLService.getBaseURL()+'printshops/requests').success(function(data){
            return data;
        });
    };
    return service;
}]);
