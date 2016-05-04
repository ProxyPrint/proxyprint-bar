angular.module('ProxyPrint').factory('printShopListService', ['Upload', '$timeout', '$http', function(Upload, $timeout, $http) {

  var service = {};
  /*service.getPrintShops = function(files) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        position = position;
        $http({
          method: 'GET',
          url: 'http://localhost:8080/printshops/nearest',
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }).then(function successCallback(response) {
          return response.data.printshops;
        }, function errorCallback(response) {
          return null;
        });
      });
    }
  };*/
  service.getPrintShops = function() {
    printshops = [{
      id: 1,
      name: "Impressões Jerónimo",
      address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
      price: 3
    }, {
      id: 2,
      name: "Copy & Paste",
      address: "Rua Augusto Semedo, 1086 Barrada",
      price: 4
    }, {
      id: 3,
      name: "Print4U",
      address: "Alameda Ana Fernandes, Porto",
      price: 5
    }];
    console.log(printshops);
    return printshops;
  }

  return service;
}]);
