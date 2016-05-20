angular.module('ProxyPrint').factory('reviewsService',['$http', 'backendURLService', function ($http, backendURLService) {

    var service = {};

    service.getPrintshopReviews = function(printshopID) {
      return $http.get(backendURLService.getBaseURL()+'printshops/'+printshopID+'/reviews')
      .success(function(data){
        return data;
      });
    };

    service.addReview = function (printshopID, review) {
      return $http.post(backendURLService.getBaseURL()+'printshops/'+printshopID+'/reviews', review);
    }

    return service;
}]);
