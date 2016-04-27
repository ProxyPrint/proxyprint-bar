angular.module('ProxyPrint').factory('SpecMarshallService',[function () {

    var service = {};

    service.marshallSpecification = function (specification){
      var spec = new Object();

      spec.name = specification[0];
      spec.paperSpecs = specification[1]+","+getFormat(specification[2])+","
        +getColors(specification[3]);

        if (specification[4]==null){
          spec.bindingSpecs = spec.coverSpecs = "";
        }

        else {
          if (specification[5]==null && specification[6]==null){
            spec.bindingSpecs = "STAPLING";
            spec.coverSpecs = "";
          }
          else {
            spec.coverSpecs = getCover(specification[5]);
            spec.bindingSpecs = getBindings(specification[6]);
          }
        }
        return spec;

    }

    getFormat = function (format) {
      switch(format){
        case 'Frente e verso':
          return 'DUPLEX';
        case 'Frente':
          return 'SIMPLEX';
        default:
          return 'ERRO';
      }
    }

    getColors = function (colors){
      switch(colors) {
        case 'A cores':
          return 'COLOR';
        case 'Preto e branco':
          return 'BW';
        case 'Tons de cinza':
          return 'GREY_TONES';
        default:
          return 'ERRO';
      }
    }

    getCover = function (cover){
      switch(cover) {
        case 'Acetato em cristal':
          return 'CRISTAL_ACETATE';
        case 'PVC transparente fosco':
          return 'PVC_TRANSPARENT';
        case 'PVC opaco':
          return 'PVC_OPAQUE';
        default:
          return 'ERRO';
      }
    }

    getBindings = function (bindings){
      switch(bindings){
        case 'Argolas de plástico':
          return 'PLASTIC';
        case 'Argolas em espiral':
          return 'SPIRAL';
        case 'Argolas de arame':
          return 'WIRE';
        default:
          return 'ERRO';
      }
    }

    return service;
}]);
