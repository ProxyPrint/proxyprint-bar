angular.module("ProxyPrint").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  var mainCSS = [
    '/assets/css/bootstrap.min.css',
    '/assets/css/styles.css',
    '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic'
  ];

  var mainPrintShopCSS = [
    '/assets/css/bootstrap.min.css',
    '/assets/css/styles-pshop.css',
    '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic'
  ];

  var adminlteCSS = [
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
    controller: 'RegisterController',
    data: {
      css: mainCSS
    }
  })
  /*Print Shop landing page*/
  .state('printshop', {
    url: '/printshop',
    templateUrl: '/app/components/home/views/printshop.html',
    controller: 'PrintShopLoginCtrl',
    data: {
      css: mainPrintShopCSS
    }
  })
  .state('psregister', {
    url: '/psregister',
    templateUrl: '/app/components/home/views/printshop_register.html',
    controller: 'PrintShopRegisterCtrl',
    data: {
      css: mainPrintShopCSS
    }
  })


  /*Consumer*/
  .state('consumer', {
    url: '/consumerID',
    views: {
      '': {
        templateUrl: '/app/components/consumer/views/consumer_mainpage.html',
        controller: 'ConsumerController'
      }
    },
    data: {
      css: mainCSS
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


  /*PrintShop*/

  /*Employee*/
  .state('employee', {
    url: '/employee/:username/',
    views: {
      '': {
        templateUrl: '/app/components/printshop/employee/views/employee-base.html',
        controller: 'EmployeeBaseCtrl'
      }
    },
    data: {
      css: adminlteCSS
    }
  })
  .state('employee.pending', {
    url: 'pending',
    templateUrl: '/app/components/printshop/employee/views/employee-requests-pending.html',
    controller: 'PendingRequestsCtrl'
  })
  .state('employee.satisfied', {
    url: 'satisfied',
    templateUrl: '/app/components/printshop/employee/views/employee-requests-satisfied.html',
    controller: 'SatisfiedRequestsCtrl'
  })
  .state('employee.history', {
    url: 'history',
    templateUrl: '/app/components/printshop/employee/views/employee-requests-history.html',
    controller: 'HistoryRequestsCtrl'
  })

  /*Manager*/
  .state('manager', {
    url: '/manager',
    templateUrl: '/app/components/printshop/manager/views/base_manager.html',
    data: {
      css: adminlteCSS
    }
  });

}]);
