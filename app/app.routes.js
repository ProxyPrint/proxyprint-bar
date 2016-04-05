angular.module("ProxyPrint").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/');
   var mainCSS = [
      '/assets/css/bootstrap.min.css',
      '/assets/css/styles.css',
      '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
      'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic',
      'https://npmcdn.com/angular-toastr/dist/angular-toastr.css'
   ];

   var printShopCSS = [
    '/assets/adminlte/bootstrap/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
    'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
    '/assets/adminlte/dist/css/AdminLTE.min.css',
    '/assets/adminlte/dist/css/skins/skin-blue.min.css'
];
               /*Consumer*/
   $stateProvider
      .state('home', {
         url: '/',
         templateUrl: '/app/components/home/views/frontpage.html',
         controller: 'LoginController',
         data: {
          css: mainCSS
         }
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
      })



                  /** PrintShop */
      .state('employee', {
         url: '/employee',
         templateUrl: '/app/components/printshop/employee/views/pending.html',
         data: {
           css: printshopCSS
         }
      })
      .state('employee.satisfied', {
         url: '/satisfied',
         templateUrl: '/app/components/printshop/employee/views/satisfied.html',
         data: {
           css: printshopCSS
         }
      })
      .state('employee.history', {
         url: '/history',
         templateUrl: '/app/components/printshop/employee/views/history.html',
         data: {
           css: printshopCSS
         }
      });


});
