var app = angular.module('ProxyPrint');

app.factory('printShopListService', ['Upload', '$timeout', '$http', 'backendURLService', '$cookieStore', function(Upload, $timeout, $http, backendURLService, $cookieStore) {

  var service = {};

  service.getPrintShops = function() {
    var coords = $cookieStore.get('coords');
    return $http.get( backendURLService.getBaseURL()+'printshops/nearest',{params: { latitude: coords.latitude, longitude: coords.longitude }})
    .success(function(response) {
      console.log(response);
      return response.printshops;
    }).error(function(response) {
      return null;
    });
  };

  service.getPrintShopsStatic = function() {
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
  };

  service.getSelectedPrintShopsIDs = function() {
    return $cookieStore.get('selectedPrintShops');
  };

  service.setSelectedPrintShopsIDs = function(pshopids) {
    $cookieStore.put('selectedPrintShops', pshopids);
  };

  return service;
}]);
