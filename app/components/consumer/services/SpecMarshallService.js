angular.module('ProxyPrint').factory('specMarshallService',[function () {

    var service = {};

    service.marshallSpecification = function (specification){
      var spec = new Object();

      spec.name = specification[0];
      // PAPER,COLOR,A4,DUPLEX --> correct key order
      spec.paperSpecs = "PAPER,"+(specification[3])+","+specification[1]+","+specification[2];

        if (specification[4]==null){
          spec.bindingSpecs = spec.coverSpecs = "";
        }

        else {
          if (specification[5]==null && specification[6]==null){
            spec.bindingSpecs = "STAPLING";
            spec.coverSpecs = "";
          }
          else {
            spec.coverSpecs = "COVER,"+specification[5];
            spec.bindingSpecs = "BINDING,"+specification[6]+","+specification[1];
          }
        }
        return spec;

    }



    return service;
}]);
