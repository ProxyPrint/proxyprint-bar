var app = angular.module('ProxyPrint');

app.factory('satisfiedPrintRequestsService', ['$http', 'backendURLService',
function($http,backendURLService) {
    var service = {};

    service.getSatisfiedRequests = function() {
        return $http.get(backendURLService.getBaseURL()+'printshops/satisfied').success(function(data){
            return data;
        });
    };

    service.getUpRequest = function(id, successCallback, errorCallback) {
        var url = backendURLService.getBaseURL()+'printshops/requests/'+id;
        return $http.post(url).success(function(data){
            if(data.success) {
                successCallback(data, id);
            } else {
                errorCallback(data, id);
            }
        });
    };

    return service;
}]);
