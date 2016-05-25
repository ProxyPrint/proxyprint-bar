var app = angular.module('ProxyPrint');

app.factory('consumerSatisfiedRequestsService', ['$http', 'backendURLService',
function($http,backendURLService) {
    var service = {};

    service.getSatisfiedRequests = function() {
        return $http.get(backendURLService.getBaseURL()+'consumer/satisfied').success(function(data){
            return ChangeStatus(data);
        });
    };

    var ChangeStatus = function(data) {

        for (var i=0; i < data.satisfiedrequests.length; i++){
            if (data.satisfiedrequests[i].printrequest.status == 'LIFTED') {
                data.satisfiedrequests[i].printrequest.status = "Levantado";
            } else if (data.satisfiedrequests[i].printrequest.status == 'FINISHED') {
                data.satisfiedrequests[i].printrequest.status = "Aguarda levantamento";
            }
        };
        return data;
    };

    return service;
}]);
