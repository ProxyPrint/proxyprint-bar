var app = angular.module('ProxyPrint');

app.factory('priceTableService', ['$http', '$cookieStore','backendURLService',function($http, $cookieStore,backendURLService) {
  var service = {};
  service.currentTable = "";
  service.currentRingType = "";
  service.currentRowIndex = -1;
  service.newEntry = {};
  service.currentEntry = {};
  service.coversOptions = [];

  service.getPriceTable = function() {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable';
    return $http.get(url).success(function(data){
      return data;
    });
  };

  // Print & Copy
  service.addNewPaperRow = function(row) {
    service.newEntry = row;
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/papers';
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  service.deletePaperRow = function(row) {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/deletepaper';
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  service.editPaperRow = function(row) {
    service.newEntry = row;
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/papers';
    return $http.put(url,row).success(function(data){
      return data;
    });
  };

  // Binding - Rings
  service.addNewRingsRow = function(row) {
    service.newEntry = row;
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/rings';
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  service.editRingsRow = function(row) {
    service.newEntry = row;
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/rings';
    return $http.put(url,row).success(function(data){
      return data;
    });
  };

  service.deleteRingRow = function(row) {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/deletering';
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  // Binding - Covers
  service.addNewCoverRow = function(row) {
    service.newEntry = row;
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/covers';
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  service.editCoverRow = function(row) {
    service.newEntry = row;
    /*var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/covers';
    return $http.put(url,row).success(function(data){
      return data;
    });*/
  };

  service.deleteCoverRow = function(row) {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/deletecover';
    return $http.post(url,row).success(function(data){
      return data;
    });
  };

  // Stapling
  service.editStaplingValue = function(newStaplingPrice) {
    var url = backendURLService.getBaseURL()+'printshops/'+$cookieStore.get("printShopID")+'/pricetable/editstapling';
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
  };

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

  service.getCurrentEntry = function() {
    return service.currentEntry;
  };

  service.setCurrentEntry = function(entry) {
    service.currentEntry = entry;
  };

  service.getCoversOptions = function() {
    return service.coversOptions;
  };

  service.getAllCoverOptions = function() {
    var options = ["CRISTAL_ACETATE", "PVC_TRANSPARENT", "PVC_OPAQUE"];
    return options;
  };

  service.setCoversOptions = function(options) {
    service.coversOptions = options;
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

  service.getKeyForCoverPresentationString = function(ps) {
    if(ps == "Argolas de Plástico") {
        return "PLASTIC";
    } else if(ps == "Argolas Espiral") {
        return "SPIRAL";
    } else if(ps == "Argolas de Arame") {
        return "WIRE";
    }
    return "";
  };

  service.getPresentationStringForCovers = function(ct) {
    if(ct == "CRISTAL_ACETATE") {
        return "Acetato de Cristal";
    } else if(ct == "PVC_TRANSPARENT") {
        return "PVC Transparente Fosco";
    } else if(ct == "PVC_OPAQUE") {
        return "PVC Opaco";
    }
    return "";
  };

  service.getKeyForCoverPresentationString = function(ct) {
    if(ct == "Acetato de Cristal") {
        return "CRISTAL_ACETATE";
    } else if(ct == "PVC Transparente Fosco") {
        return "PVC_TRANSPARENT";
    } else if(ct == "PVC Opaco") {
        return "PVC_OPAQUE";
    }
    return "";
  };

  return service;
}]);
