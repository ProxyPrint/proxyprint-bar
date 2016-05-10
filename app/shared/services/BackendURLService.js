angular.module('ProxyPrint').factory('backendURLService', ['$http', function($http) {

    var service = {};

    var url;

    $http({
        method: 'GET',
        url: '/config'
    }).then(function successCallback(response) {
        console.log(response.data);
        url = response.data;
    }, function errorCallback(response) {
        //cant establish connection with backend
    });

    service.getBaseURL = function() {
        return url;
    };

    return service;
}]);
