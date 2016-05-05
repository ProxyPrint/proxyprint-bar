var app = angular.module('ProxyPrint');

app.factory('pendingPrintRequestsService', ['$http', 'backendURLService',
function($http,backendURLService) {
    var service = {};
    service.currentRequest = {};

    service.getPendingRequests = function() {
        return $http.get(backendURLService.getBaseURL()+'printshops/requests').success(function(data){
            return data;
        });
    };

    service.acceptRequest = function(id) {
        var url = backendURLService.getBaseURL()+'printshops/requests/'+id;
        return $http.post(url).success(function(data){
            return data;
        });
    };

    service.setCurrentRequest = function(request) {
        service.currentRequest = request;
    };

    service.getCurrentRequest = function() {
        return service.currentRequest;
    };

    return service;
}]);
