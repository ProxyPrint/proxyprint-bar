angular.module("ProxyPrint").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/');

   $stateProvider
      .state('home', {
         url: '/',
         templateUrl: '/app/components/home/views/frontpage.html',
         controller: 'LoginController'
      })
      .state('register' , {
         url: '/register',
         templateUrl: '/app/components/home/views/register.html',
         controller: 'RegisterController'
      })
      .state('costumer', {
         url: '/:costumerID',
         views: {
            '': {
               templateUrl: '/app/components/customer/views/customer_mainpage.html',
               controller: 'costumerController'
            }
         }

      })
      .state('costumer.settings' ,{
         url: '/settings',
         templateUrl: '/app/components/customer/views/customer_settings.html'
      });


}]);
