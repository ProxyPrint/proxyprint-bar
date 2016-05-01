var app = angular.module('ProxyPrint');

app.factory('PriceTableService', ['$http', '$cookieStore', function($http, $cookieStore) {
  var service = {};
  service.currentTable = "";
  service.currentRowIndex = -1;
  service.newEntry = {};

  service.getPriceTable = function() {
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable";
    return $http.get(url).success(function(data){
      return data;
    });
  };

  service.deleteRow = function(row) {
    console.log(row);
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/deletepaperitem";
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  service.addNewRow = function(row) {
    service.newEntry = row;
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable";
    return $http.post(url,row).success(function(data){
      return data;
    });
  }

  service.setCurrentTable = function(table) {
    service.currentTable = table;
  };

  service.getCurrentTable = function() {
    return service.currentTable;
  };

  service.getNewEntry = function() {
    return service.newEntry;
  }

  service.setCurrentRowIndex = function(index) {
    service.currentRowIndex = index;
  };

  service.getCurrentRowIndex = function() {
    return service.currentRowIndex;
  };

  return service;
}]);
