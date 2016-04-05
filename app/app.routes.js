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
      .state('consumer', {
         url: '/:consumerID',
         views: {
            '': {
               templateUrl: '/app/components/consumer/views/consumer_mainpage.html',
               controller: 'ConsumerController'
            }
         }

      })
      .state('consumer.settings' ,{
         url: '/settings',
         templateUrl: '/app/components/consumer/views/consumer_settings.html'
      })
      .state('consumer.mainpage' ,{
         url: '/mainpage',
         templateUrl: '/app/components/consumer/views/consumer_maincontent.html'
      });


}]);
