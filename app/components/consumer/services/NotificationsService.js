angular.module('ProxyPrint').factory('notificationsService', ['$http', 'backendURLService', function($http, backendURLService) {

    var service = {};

    function parseNotification(message) {
        var d = new Date(message.timestamp);
        message.day = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        message.hour = d.getHours() + ':' + d.getMinutes();
        message.read = true;
        return message;
    }

    service.getNotifications = function(callback) {
        return $http.get(backendURLService.getBaseURL() + 'consumer/notifications')
            .success(function(data) {
                var notifications = new Array();
                for (var i in data) {
                    notifications.unshift(parseNotification(data[i]));
                }
                return notifications;
            });
    };


    return service;
}]);