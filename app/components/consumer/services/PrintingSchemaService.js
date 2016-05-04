angular.module('ProxyPrint').factory('printingSchemaService',['$http', 'backendURLService', function ($http, backendURLService) {

    var service = {};

    service.getPrintingSchemas = function(consumerID) {
      return $http.get(backendURLService.getBaseURL()+'consumer/'+consumerID+'/printingschemas')
      .success(function(data){
        return setFakeIDs(data);
      });
    };

    service.addPrintingSchema = function (schema, consumerID){
      return $http.post(backendURLService.getBaseURL()+'consumer/'+consumerID+'/printingschemas', schema);
    }

    service.deletePrintingSchema = function (schemaID, consumerID) {
      return $http.delete(backendURLService.getBaseURL()+'consumer/'+consumerID+'/printingschemas/'+schemaID);
    }

    service.editPrintingSchema = function (schema, consumerID) {
      return $http.put(backendURLService.getBaseURL()+'consumer/'+consumerID+'/printingschemas/'+schema.id, schema);
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
