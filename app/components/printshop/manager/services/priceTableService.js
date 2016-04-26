var app = angular.module('ProxyPrint');

app.factory('PriceTableService', ['$http', function($http) {
  var service = {};
  service.currentTable = "";
  service.priceTable = {
      "BW": [
        {infLim: "1", supLim: "20", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "21", supLim: "30", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "31", supLim: "100", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20}
      ],
      "COLOR": [
        {infLim: "1", supLim: "20", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "21", supLim: "30", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "31", supLim: "100", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20}
      ]
    };

  service.deleteRow = function(index) {
    service.priceTable[service.currentTable].splice(index, 1);
  };

  service.addNewRow = function(row) {
    service.priceTable[service.currentTable].push(row);
  }

  service.setPriceTable = function(priceTable) {
    service.priceTable = priceTable;
  };

  service.getPriceTable = function() {
    return service.priceTable;
  };

  service.setCurrentTable = function(table) {
    service.currentTable = table;
  };

  service.getCurrentTable = function() {
    return service.currentTable;
  };

  return service;
}]);
