angular.module('ProxyPrint').factory('notificationsService',['$http', 'backendURLService', function ($http, backendURLService) {

    var service = {};

    service.getNotifications = function(consumerID) {
      return $http.get(backendURLService.getBaseURL()+'consumer/notifications')
      .success(function(data){
        return data;
      });
    };


    return service;
}]);
