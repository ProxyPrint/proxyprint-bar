angular.module("ProxyPrint").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/404');
    var frontpageCSS = [
        '/assets/css/frontpage.css',
        '/assets/css/bootstrap.min.css',
        '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
        'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic'
    ];

    var mainCSS = [
        '/assets/css/styles.css',
        '/assets/css/bootstrap.min.css',
        '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
        '/assets/css/angular-notification-icons.css',
        'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic',
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

    var adminLoginCSS = [
        '/assets/adminlte/bootstrap/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css',
        '/assets/adminlte/dist/css/AdminLTE.min.css',
        '/assets/css/adminlogin.css'

    ];

    /*Consumer*/
    $stateProvider
    .state('notFound', {
        url: '/404',
        templateUrl: '/app/components/errors/404.html',
        data: {
            css: adminlteCSS
        }
    })
    .state('home', {
        url: '/',
        templateUrl: '/app/components/home/views/frontpage.html',
        controller: 'LoginController',
        data: {
            css: frontpageCSS
        }
    })
    .state('register' , {
        url: '/register',
        templateUrl: '/app/components/home/views/register.html',
        controller: 'RegisterController',
        data: {
            css: frontpageCSS
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
    .state('adminlogin', {
        url: '/adminlogin',
        templateUrl: '/app/components/admin/views/admin-login.html',
        controller: 'AdminLoginController',
        data: {
            css: adminLoginCSS
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
    .state('consumer.history' , {
        url: '/history',
        templateUrl: '/app/components/consumer/views/consumer_history.html',
        controller: 'ConsumerHistoryController'
    })
    .state('consumer.printshoplist', {
        url: '/printshops',
        templateUrl: '/app/components/consumer/views/consumer_printshoplist.html',
        controller: 'ConsumerPrintshopList'
    })
    .state('consumer.requestbudget', {
        url: '/requestbudget',
        templateUrl: '/app/components/consumer/views/consumer_requestBudget.html',
        controller: 'ConsumerSpecsController'
    })

    /*PrintShop*/

    /*Employee*/
    .state('employee', {
        url: '/employee/:username',
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
        url: '/pending',
        templateUrl: '/app/components/printshop/employee/views/employee-requests-pending.html',
        controller: 'PendingRequestsCtrl'
    })
    .state('employee.satisfied', {
        url: '/satisfied',
        templateUrl: '/app/components/printshop/employee/views/employee-requests-satisfied.html',
        controller: 'SatisfiedRequestsCtrl'
    })
    .state('employee.history', {
        url: '/history',
        templateUrl: '/app/components/printshop/employee/views/employee-requests-history.html',
        controller: 'HistoryRequestsCtrl'
    })

    /*Manager*/
    .state('manager', {
        url: '/manager',
        views: {
            '': {
                templateUrl: '/app/components/printshop/manager/views/manager-base.html',
                controller: 'ManagerBaseCtrl'
            }
        },
        data: {
            css: adminlteCSS
        }
    })
    .state('manager.info', {
        url: '/main',
        templateUrl: '/app/components/printshop/manager/views/manager-base-info.html',
        controller: 'ManagerInfoCtrl'
    })
    .state('manager.stats', {
        url: '/stats',
        templateUrl: '/app/components/printshop/manager/views/manager-stats.html',
        controller: 'ManagerStatsCtrl'
    })
    .state('manager.employees', {
        url: '/employees',
        templateUrl: '/app/components/printshop/manager/views/manager-employees.html',
        controller: 'ManagerEmployeesCtrl'
    })
    .state('manager.pricetable', {
        url: '/pricetable',
        templateUrl: '/app/components/printshop/manager/views/manager-pricetable.html',
        controller: 'ManagerPriceTableCtrl'
    })


  /*Admin*/
  .state('admin', {
      abstract: true,
      url: '/admin/:username',
      views: {
          '': {
              templateUrl: '/app/components/admin/views/admin-base.html',
              controller: 'AdminBaseCtrl'
          }
      },
      data: {
          css: adminlteCSS
      }
  })
  .state('admin.requests', {
      url: '/requests',
      templateUrl: '/app/components/admin/views/admin-pending-requests.html',
      controller: 'AdminPendingRequestsCtrl',
      resolve: {
        pendingRequests: ['PendingRequestsService', function(PendingRequestsService){
          return PendingRequestsService.getPendingRequests();
        }]
      }
  })
  .state('admin.request', {
      url: '/requests/:requestid',
      templateUrl: '/app/components/admin/views/admin-request.html',
      controller: 'AdminPendingRequestDetailCtrl',
      resolve: {
         pendingRequest: ['PendingRequestsService', function (PendingRequestsService) {
               return PendingRequestsService.getCurrentRequest();
         }]
      }
  })
  .state('admin.printshops', {
    url: '/printshops',
    templateUrl: '/app/components/admin/views/admin-printshops.html',
    controller: 'AdminPrintShopsCtrl'
  });

}]);
