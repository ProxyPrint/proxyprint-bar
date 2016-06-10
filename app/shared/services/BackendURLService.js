angular.module('ProxyPrint').factory('backendURLService', ['$http', '$cookieStore', function($http, $cookieStore) {

    var service = {};

    var url;

    $http({
        method: 'GET',
        url: '/config'
    }).then(function successCallback(response) {
        console.log(response.data);
        url = response.data;
        $cookieStore.put("baseURL", url);
    }, function errorCallback(response) {
        //cant establish connection with backend
    });

    service.getBaseURL = function() {
        return $cookieStore.get("baseURL");
    };

    return service;
}]);
