angular.module('ProxyPrint').factory('specMarshallService',[function () {

    var service = {};

    service.marshallSpecification = function (specification){
      var spec = {};

      spec.name = specification[0];
      // PAPER,COLOR,A4,DUPLEX --> correct key order
      spec.paperSpecs = "PAPER,"+(specification[3])+","+specification[1]+","+specification[2];

      if (!specification[4]){
        spec.bindingSpecs = spec.coverSpecs = "";
      }

      else {
        if (!specification[5] && !specification[6]){
          spec.bindingSpecs = "BINDING,STAPLING,0,0";
          spec.coverSpecs = "";
        }
        else {
          spec.coverSpecs = "COVER,"+specification[5];
          spec.bindingSpecs = "BINDING,"+specification[6]+","+specification[1];
        }
      }
      return spec;
    };

    service.marshallEditedSpecification = function (specification) {
      var spec = {};
      // console.log(specification);

      spec.name = specification.name;
      spec.paperSpecs = "PAPER,"+specification.colors+','+specification.format+','+specification.sides;


      if (specification.content === null)
        spec.bindingSpecs = spec.coverSpecs = "";
      else {
        if (specification.content == "stapled"){
          spec.bindingSpecs = "BINDING,STAPLING,0,0";
          spec.coverSpecs = "";
        }
        else {
          spec.coverSpecs = "COVER,"+specification.coverSpecs+","+specification.format;
          spec.bindingSpecs = "BINDING,"+specification.bindingSpecs;
        }

      }
      return spec;
    };

    service.unmarshallSpecification = function (specification) {
      // console.log(specification);
      var schema = {};
      schema.name = specification.name;
      var paperSpecs = specification.paperSpecs.split(',');
      schema.format = paperSpecs[2];
      schema.sides = paperSpecs[3];
      schema.colors = paperSpecs[1];
      if (specification.bindingSpecs!==''){
        var bindings = specification.bindingSpecs.split(',');
        if (bindings[1]=="STAPLING")
          schema.content = 'stapled';
        else
          schema.content = 'enc';
          schema.bindingSpecs = bindings[1];
        }
      if (specification.coverSpecs!==''){
        var cover = specification.coverSpecs.split(',');
        schema.coverSpecs = cover[1];
      }
      return schema;
    };

    return service;
}]);
