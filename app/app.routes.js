angular.module("ProxyPrint").config(['$routeProvider', function ($routeProvider ) {
   $routeProvider.
      when('/', {
         templateUrl: '/app/components/home/views/frontpage.html',
         controller: 'LoginController'
      }).
      when('/register' , {
         templateUrl: '/app/components/home/views/register.html'
      }).
      when('/:userID', {
         templateUrl: '/app/components/consumer/views/consumer_mainpage.html'
      }).
      when('/pshop/employee/:userID', {
        templateUrl: '/app/components/printshop/employee/views/pending.html'
      }).
      otherwise({
         redirectTo: '/'
      });


}]);
