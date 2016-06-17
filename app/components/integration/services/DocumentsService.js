var app = angular.module('ProxyPrint');

app.factory('documentsService', ['$http', 'backendURLService', 'fileTransferService',
function($http, backendURLService, fileTransferService) {
    var service = {};

    service.getDocuments = function(documentID) {
        $http.get(backendURLService.getBaseURL() + "printdocument/" + documentID).success(function(data){
            console.log(data);
            fileTransferService.setOldFiles(data.documents);
            return data;
        });
    };

    return service;
}]);
