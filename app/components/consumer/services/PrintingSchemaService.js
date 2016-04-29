angular.module('ProxyPrint').factory('PrintingSchemaService',['$http', function ($http) {

    var service = {};

    service.getPrintingSchemas = function(consumerID) {
      return $http.get('http://localhost:8080/consumer/'+consumerID+'/printingschemas').success(function(data){
        return data;
      });
    };

    service.addPrintingSchema = function (schema, consumerID){
      return $http.post('http://localhost:8080/consumer/'+consumerID+'/printingschemas', schema);
    }

    return service;
}]);
