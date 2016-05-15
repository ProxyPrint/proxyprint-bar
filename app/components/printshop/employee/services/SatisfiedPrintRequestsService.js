var app = angular.module('ProxyPrint');

app.factory('satisfiedPrintRequestsService', ['$http', 'backendURLService',
function($http,backendURLService) {
    var service = {};

    service.getSatisfiedRequests = function() {
        return $http.get(backendURLService.getBaseURL()+'printshops/satisfied').success(function(data){
            return data;
        });
    };

    service.getUpRequest = function() {

    };

    return service;
}]);
