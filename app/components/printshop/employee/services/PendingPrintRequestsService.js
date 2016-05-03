var app = angular.module('ProxyPrint');

app.factory('PendingPrintRequestsService', ['$http', function($http) {
    var service = {};
    service.currentRequest = {};

    service.getPendingRequests = function() {
        return $http.get('http://localhost:8080/printshops/requests').success(function(data){
            return data;
        });
    };
    return service;
}]);
