var app = angular.module('ProxyPrint');

app.factory('PriceTableService', ['$http', function($http) {
  var service = {};
  service.currentTable = "";
      /*"BW": [
        {infLim: "1", supLim: "20", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "21", supLim: "30", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "31", supLim: "100", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20}
      ],
      "COLOR": [
        {infLim: "1", supLim: "20", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "21", supLim: "30", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20},
        {infLim: "31", supLim: "100", priceA4SIMPLEX: 0.10, priceA4DUPLEX: 0.12, priceA3SIMPLEX: 0.22, priceA3DUPLEX: 0.20}
      ]
    };*/

  service.getPriceTable = function() {
    return $http.get("http://localhost:8080/printshops/1/pricetable").success(function(data){
      return data;
    });
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

  service.setCurrentTable = function(table) {
    service.currentTable = table;
  };

  service.getCurrentTable = function() {
    return service.currentTable;
  };

  return service;
}]);
