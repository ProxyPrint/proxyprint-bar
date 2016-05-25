var app = angular.module('ProxyPrint');

app.factory('pendingPrintRequestsService', ['$http', 'backendURLService',
function($http,backendURLService) {
    var service = {};
    service.currentRequest = {};

    service.getPendingRequests = function() {
        return $http.get(backendURLService.getBaseURL()+'printshops/requests').success(function(data){
            return ChangeStatus(data);
        });
    };

    var ChangeStatus = function(data) {
        for (var i=0; i < data.printrequest.length; i++){
          if ( data.printrequest[i].status == 'PENDING') {
            data.printrequest[i].status = "Pedido pendente";
          } else if (data.printrequest[i].status == 'IN_PROGRESS') {
            data.printrequest[i].status = "A ser atendido";
          } else if (data.printrequest[i].status == 'FINISHED') {
            data.printrequest[i].status = "Finalizado";
          }
      };
      return data;
    };

    service.acceptRequest = function(id, successCallback, errorCallback) {
        var url = backendURLService.getBaseURL()+'printshops/requests/'+id;
        return $http.post(url).success(function(data){
            if(data.success) {
                successCallback(data);
            } else {
                errorCallback(data);
            }
        });
    };

    service.rejectRequest = function(id, motive , successCallback, errorCallback) {
        var url = backendURLService.getBaseURL()+'printshops/requests/cancel/' + id;
        return $http.delete(url, motive).success(function(data){
            if(data.success) {
                successCallback(data);
            } else {
                errorCallback(data);
            }
        });
    };

    service.getRequest = function(id) {
        var url = backendURLService.getBaseURL()+'printshops/requests/'+id;
        return $http.get(url).success(function(data){
            return data;
        });
    };

    return service;
}]);
