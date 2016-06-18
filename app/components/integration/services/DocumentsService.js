var app = angular.module('ProxyPrint');

app.factory('documentsService', ['$http', 'backendURLService', 'fileTransferService',
function($http, backendURLService, fileTransferService) {
    var service = {};

    // Vai buscar o documento pelo ID
    service.getDocuments = function(documentID) {
        return $http.get(backendURLService.getBaseURL() + "printdocument/" + documentID).success(function(data){
            return data;
        });
    };

    return service;
}]);
