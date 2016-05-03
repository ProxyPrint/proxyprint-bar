var app = angular.module('ProxyPrint');

app.factory('PriceTableService', ['$http', '$cookieStore', function($http, $cookieStore) {
  var service = {};
  service.currentTable = "";
  service.currentRingType = "";
  service.currentRowIndex = -1;
  service.newEntry = {};

  service.getPriceTable = function() {
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable";
    return $http.get(url).success(function(data){
      return data;
    });
  };

  // Print & Copy
  service.addNewPaperRow = function(row) {
    service.newEntry = row;
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/papers";
    return $http.post(url,row).success(function(data){
      return data;
    });
  }

  service.deletePaperRow = function(row) {
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/deletepaperitem";
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  // Binding - Rings
  service.addNewRingsRow = function(row) {
    service.newEntry = row;
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/rings";
    return $http.post(url,row).success(function(data){
      return data;
    });
  }

  service.deleteRingRow = function(row) {
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/deleteringitem";
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  // Stapling
  service.editStaplingValue = function(newStaplingPrice) {
    var url = "http://localhost:8080/printshops/"+$cookieStore.get("printShopID")+"/pricetable/editstapling";
    return $http.put(url,newStaplingPrice.toString()).success(function(data){
      return data;
    });
  };

  // Service variables
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

  service.setCurrentRingType = function(index) {
    service.currentRingType = index;
  };

  service.getCurrentRingType = function() {
    return service.currentRingType;
  };

  service.getPresentationStringForRings = function(rt) {
    if(rt == "PLASTIC") {
        return "Argolas de Plástico";
    } else if(rt == "SPIRAL") {
        return "Argolas Espiral";
    } else if(rt == "WIRE") {
        return "Argolas de Arame";
    }
    return "";
  };

  return service;
}]);
