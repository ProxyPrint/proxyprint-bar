angular.module('ProxyPrint').factory('specMarshallService',[function () {

    var service = {};

    service.marshallSpecification = function (specification){
      var spec = new Object();

      spec.name = specification[0];
      spec.paperSpecs = specification[1]+","+specification[2]+","+(specification[3]);

        if (specification[4]==null){
          spec.bindingSpecs = spec.coverSpecs = "";
        }

        else {
          if (specification[5]==null && specification[6]==null){
            spec.bindingSpecs = "STAPLING";
            spec.coverSpecs = "";
          }
          else {
            spec.coverSpecs = specification[5];
            spec.bindingSpecs = specification[6]+","+specification[1];
          }
        }
        return spec;

    }

    service.unmarshallSpecification = function (specification) {
      var schema = new Object();
      console.log(specification);
      schema.name = specification.name;
      var paperSpecs = specification.paperSpecs.split(',');
      schema.format = paperSpecs[0];
      schema.sides = paperSpecs[1];
      schema.colors = paperSpecs[2];
      if (specification.bindingSpecs!=null)
        schema.bindingSpecs = bindingEngToPt(specification.bindingSpecs);
      if (specification.coverSpecs!=null)
        schema.coverSpecs = coverEngToPt(specification.coverSpecs);


      return schema;
    }

    function sidesEngToPt(sides) {
      switch (sides) {
        case 'SIMPLEX':
          return 'Frente';
        case 'DUPLEX':
          return 'Frente e verso';
      }

    }

    function colorsEngToPt (colors) {
      switch (colors){
        case 'COLOR':
          return 'A cores';
        case 'GREY_TONES':
          return 'Tons de cinza';
        case 'BW':
          return 'Preto e branco'
      }
    }

    function bindingEngToPt (bindingSpecs) {
      var bindings = bindingSpecs.split(',');
      switch (bindings[0]){
        case 'PLASTIC':
          return 'Argolas de plástico';
        case 'SPIRAL':
          return 'Argolas em espiral';
        case 'WIRE':
          return 'Argolas de arame';
        case 'STEELMAT':
          return 'Encadernação térmica';
        case 'STAPLING':
          return 'STAPLING';
      }
    }

    function coverEngToPt (coverSpecs) {
      var cover = coverSpecs.split(',');
      switch(cover[0]){
        case 'CRISTAL_ACETATE':
          return 'Acetato em cristal';
        case 'PVC_TRANSPARENT':
          return 'PVC transparente fosco';
        case 'PVC_OPAQUE':
          return 'PVC opaco';
      }
    }



    return service;
}]);
