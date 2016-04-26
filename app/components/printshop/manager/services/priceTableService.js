var app = angular.module('ProxyPrint');

app.factory('PriceTableService', ['$http', function($http) {
  var service = {};
  service.currentTable = "";

  service.getPriceTable = function() {
    return $http.get("http://localhost:8080/printshops/100/pricetable").success(function(data){
      return data;
    });
  };

  service.deleteRow = function(index) {
    // POST DELETE
  };

  service.addNewRow = function(row) {
    service.priceTable[service.currentTable].push(row);
  }

  service.setCurrentTable = function(table) {
    service.currentTable = table;
  };

  service.getCurrentTable = function() {
    return service.currentTable;
  };

  return service;
}]);
