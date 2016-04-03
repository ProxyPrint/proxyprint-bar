angular.module("ProxyPrint").config(function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise("/");
   $stateProvider
      .state('frontpage', {
         url: '/',
         templateUrl: '/app/components/home/views/frontpage.html',
         controller: 'LoginController',
         data: {
          css: [
           '/assets/css/bootstrap.min.css',
           '/assets/css/styles.css',
           '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
           'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic',
           'https://npmcdn.com/angular-toastr/dist/angular-toastr.css'
          ]
         }
      })
      .state('register' , {
         url: '/register',
         templateUrl: '/app/components/home/views/register.html',
      })
      .state('consumer', {
         url: '/consumer',
         templateUrl: '/app/components/consumer/views/consumer_mainpage.html'
      })
      .state('employee', {
         url: '/employee',
         templateUrl: '/app/components/printshop/employee/views/pending.html',
         data: {
           css: [
            '/assets/adminlte/bootstrap/css/bootstrap.min.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
            'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
            '/assets/adminlte/dist/css/AdminLTE.min.css',
            '/assets/adminlte/dist/css/skins/skin-blue.min.css'
           ]
         }
      });

});
