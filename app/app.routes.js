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
         templateUrl: '/app/components/consumer/views/customer_mainpage.html'
      }).
      otherwise({
         redirectTo: '/'
      });


}]);
