angular.module('ProxyPrint').factory('notificationsService', ['$http', 'backendURLService', function($http, backendURLService) {

    var service = {};

    function parseNotification(message) {
        var d = new Date(message.timestamp);
        message.day = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        message.hour = d.getHours() + ':' + d.getMinutes();
        message.read = true;
        console.log(message);
        return message;
    }

    service.getNotifications = function(callback) {
        $http.get(backendURLService.getBaseURL() + 'consumer/notifications')
            .success(function(data) {
                console.log(data);
                var notifications = new Array();
                for (var i in data) {
                    notifications.unshift(parseNotification(data[i]));
                }
                callback(notifications);
            });
    };


    return service;
}]);
