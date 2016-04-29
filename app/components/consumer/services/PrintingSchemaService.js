angular.module('ProxyPrint').factory('PrintingSchemaService',[function () {

    var service = {};

    service.getPrintingSchemas = function(consumerID) {
      return $http.get('http://localhost:8080/consumer/'+consumerID+'/printingschemas').success(function(data){
        return data;
      });
    };

    return service;
}]);
