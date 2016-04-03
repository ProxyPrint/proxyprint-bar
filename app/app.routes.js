angular.module("ProxyPrint").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/');

   $stateProvider.
      state('homepage', {
         url: '/',
         templateUrl: '/app/components/home/views/frontpage.html',
         controller: 'LoginController'
      }).
      state('register' , {
         url: '/register',
         templateUrl: '/app/components/home/views/register.html'
      }).
      state('costumerPage', {
         url: '/:costumerID',
         templateUrl: '/app/components/customer/views/customer_mainpage.html'
      });

}]);
