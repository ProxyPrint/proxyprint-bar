angular.module('ProxyPrint').factory('PrintingSchemaService',['$http', function ($http) {

    var service = {};

    service.getPrintingSchemas = function(consumerID) {
      return $http.get('http://localhost:8080/consumer/'+consumerID+'/printingschemas')
      .success(function(data){
        return setFakeIDs(data);
      });
    };

    service.addPrintingSchema = function (schema, consumerID){
      return $http.post('http://localhost:8080/consumer/'+consumerID+'/printingschemas', schema);
    }

    service.deletePrintingSchema = function (schemaID, consumerID) {
      return $http.delete('http://localhost:8080/consumer/'+consumerID+'/printingschemas/'+schemaID);
    }

    service.editPrintingSchema = function (schema, consumerID) {
      return $http.put('http://localhost:8080/consumer/'+consumerID+'/printingschemas/'+schema.id, schema);
    }

    setFakeIDs = function (data) {
      var i, size;
      size = data.length;
      for (i=0;i<data.length;i++)
        data[i].fakeID = i+1;
      return data;
    }

    return service;
}]);
