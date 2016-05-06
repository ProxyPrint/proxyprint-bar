var app = angular.module('ProxyPrint');

app.factory('printShopListService', ['Upload', '$timeout', '$http', 'backendURLService', function(Upload, $timeout, $http, backendURLService) {

  var service = {};
  /*service.getPrintShops = function(files) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        position = position;
        return $http({
          method: 'GET',
          url: backendURLService.getBaseURL()+'printshops/nearest',
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }).then(function successCallback(response) {
          // console.log(response.data.printshops);
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
      price: 3,
      distance: 1
    }, {
      id: 2,
      name: "Copy & Paste",
      address: "Rua Augusto Semedo, 1086 Barrada",
      price: 4,
      distance: 2
    }, {
      id: 3,
      name: "Print4U",
      address: "Alameda Ana Fernandes, Porto",
      price: 5,
      distance: 3
    },
    {
      id: 4,
      name: "Impressões Jerónimo I",
      address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
      price: 3,
      distance: 10
    },
    {
      id: 5,
      name: "Impressões Jerónimo II",
      address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
      price: 3,
      distance: 15
    },
    {
      id: 6,
      name: "Impressões Jerónimo II",
      address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
      price: 3,
      distance: 30
    },
    {
      id: 7,
      name: "Impressões Jerónimo III",
      address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
      price: 3,
      distance: 35
    },
    {
      id: 8,
      name: "Impressões Jerónimo IV",
      address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
      price: 3,
      distance: 120
    }];

    return printshops;
  }

  return service;
}]);
