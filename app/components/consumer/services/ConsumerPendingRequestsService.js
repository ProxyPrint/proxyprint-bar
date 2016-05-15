var app = angular.module('ProxyPrint');

app.factory('consumerPendingRequestsService', ['$http', 'backendURLService',
function($http,backendURLService) {
    var service = {};

    service.getPendingRequests = function() {
        return $http.get(backendURLService.getBaseURL()+'consumer/requests').success(function(data){
            return data;
        });
    };

    service.rejectRequest = function(id , successCallback, errorCallback) {
        var url = backendURLService.getBaseURL()+'consumer/requests/cancel/' + id;
        return $http.post(url).success(function(data){
            if(data.success) {
                successCallback(data);
            } else {
                errorCallback(data);
            }
        });
    };

    return service;
}]);
