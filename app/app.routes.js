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
         templateUrl: '/app/components/home/views/register.html'
      })
      .state('costumer', {
         url: '/:costumerID',
         views: {
            '': {
               templateUrl: '/app/components/customer/views/customer_mainpage.html'
            },
            'navbar@costumer' : {
               templateUrl: '/app/components/customer/views/customer_navbar.html'
            }
         }

      })
      .state('costumer.settings' ,{
         url: '/settings',
         templateUrl: '/app/components/customer/views/customer_settings.html'
      });


}]);
