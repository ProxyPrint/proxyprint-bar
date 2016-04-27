var app = angular.module('ProxyPrint');

app.factory('PriceTableService', ['$http', '$cookieStore', function($http, $cookieStore) {
  var service = {};
  service.currentTable = "";
  service.newEntry = {};

  service.getPriceTable = function() {
    return $http.get("http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable").success(function(data){
      return data;
    });
  };

  service.deleteRow = function(row) {
    // Not ok
    /*var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/deletepaperitem";
    return $http.post(url,row).success(function(data){
      return data;
    });*/
    var data = {success: 'true'};
    return data;
  };

  service.addNewRow = function(row) {
    service.newEntry = row;
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/newpaperitem";
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

  return service;
}]);
