angular.module("ProxyPrint").config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/404');
  var frontpageCSS = [
    '/assets/css/frontpage.css',
    '/assets/css/bootstrap.min.css',
    '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic',
    '/assets/css/buttons.css'
  ];

  var mainCSS = [
    '/assets/css/styles.css',
    '/assets/css/bootstrap.min.css',
    '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    '/assets/css/angular-notification-icons.css',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic',
    'https://cdnjs.cloudflare.com/ajax/libs/ng-table/0.8.3/ng-table.min.css',
    '/node_modules/hover.css/css/hover-min.css',
    '/assets/css/buttons.css',
    '/node_modules/angular-ui-notification/dist/angular-ui-notification.min.css',
    '/assets/css/spinner.css'
  ];

    var mainPrintShopCSS = [
        '/assets/css/styles-pshop.css',
        '/assets/css/bootstrap.min.css',
        '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
        'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic',
        '/assets/css/buttons.css'
    ];

  var adminlteCSS = [
    '/assets/css/styles-map.css',
    '/assets/adminlte/bootstrap/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
    'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
    '/assets/adminlte/dist/css/AdminLTE.min.css',
    '/assets/adminlte/dist/css/skins/skin-blue.min.css',
    '/assets/css/spinner.css'
  ];

  var gradientSoligBgCSS = [
    '/assets/adminlte/bootstrap/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css',
    '/assets/adminlte/dist/css/AdminLTE.min.css',
    '/assets/css/gradientpage.css',
    '/node_modules/hover.css/css/hover-min.css'
  ];

  /*Consumer*/
  $stateProvider
  .state('notFound', {
    url: '/notfound',
    templateUrl: '/app/shared/views/404.html',
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
      css: gradientSoligBgCSS
    }
  })
  /*Print Shop landing page*/
  .state('printshop', {
    url: '/printshop',
    templateUrl: '/app/components/home/views/printshop.html',
    controller: 'LoginController',
    data: {
      css: mainPrintShopCSS
    }
  })
  .state('psregister', {
    url: '/psregister',
    templateUrl: '/app/components/home/views/printshop-register.html',
    controller: 'PrintShopRegisterCtrl',
    data: {
      css: gradientSoligBgCSS
    }
  })
  .state('adminlogin', {
    url: '/adminlogin',
    templateUrl: '/app/components/admin/views/admin-login.html',
    controller: 'LoginController',
    data: {
      css: gradientSoligBgCSS
    }
  })


  /*Consumer*/
  .state('consumer', {
    abstract: true,
    url: '/:consumerID',
    views: {
      '': {
        templateUrl: '/app/components/consumer/views/consumer-base.html',
        controller: 'ConsumerController'
      }
    },
    data: {
      css: mainCSS
    },
    resolve: {
      notifications: ['notificationsService', function (notificationsService) {
        return notificationsService.getNotifications();
      }],
      consumerPendingRequests: ['consumerPendingRequestsService', function (consumerPendingRequestsService) {
        return consumerPendingRequestsService.getPendingRequests();
      }]
    }
  })
  .state('consumer.settings' ,{
    url: '/settings',
    templateUrl: '/app/components/consumer/views/consumer-settings.html',
    controller: 'ConsumerSettingsCtrl',
    resolve: {
      consumer: ['consumerService', function(consumerService) {
        return consumerService.getConsumerInfo();
      }]
    }
  })
  .state('consumer.mainpage' ,{
    url: '/mainpage',
    templateUrl: '/app/components/consumer/views/consumer-mainpage.html'
  })
  .state('consumer.history' , {
    url: '/history',
    templateUrl: '/app/components/consumer/views/consumer-history.html',
    controller: 'ConsumerHistoryController',
    resolve: {
      consumerSatisfiedRequests : ['consumerSatisfiedRequestsService',
      function(consumerSatisfiedRequestsService) {
        return consumerSatisfiedRequestsService.getSatisfiedRequests();
      }]
    }
  })
  .state('consumer.printshoplist', {
    url: '/printshops',
    templateUrl: '/app/components/consumer/views/consumer-printshoplist.html',
    controller: 'ConsumerPrintshopList',
    resolve: {
      printshops: ['printshopService',
      function (printshopService) {
        return printshopService.getAllPrintshops();
      }]
    }
  })
  .state('consumer.requestbudget', {
    url: '/requestbudget',
    templateUrl: '/app/components/consumer/views/consumer-files-specs.html',
    controller: 'ConsumerSpecsController',
    resolve: {
      printingSchemas : ['printingSchemaService','$cookieStore',
      function(printingSchemaService, $cookieStore) {
        return printingSchemaService.getPrintingSchemas($cookieStore.get('consumerID'));
      }],
      permission: ['$q','requestHelperService', function ($q, requestHelperService) {
          var d = $q.defer();
          if (requestHelperService.getSubmittedFilesStatus()) {
            d.resolve();
          } else {
            d.reject('Canceled');
          }
          return d.promise;
        }]
    }
  })
  .state('consumer.printshopselection', {
    url: '/pshopselection',
    templateUrl: '/app/components/consumer/views/consumer-printshops-selection.html',
    controller: 'ConsumerPrintShopsSelectionController',
    resolve: {
      printshopsList : ['printShopListService', function(printShopListService) {
        return printShopListService.getPrintShops();
      }],
      permission: ['$q','requestHelperService', function ($q, requestHelperService) {
          var d = $q.defer();
          if (requestHelperService.getSpecsStatus()) {
            d.resolve();
          } else {
            d.reject('Canceled');
          }
          return d.promise;
        }]
    }
  })
  .state('consumer.budgetselection', {
    url: '/budgets',
    templateUrl: '/app/components/consumer/views/consumer-budget-selection.html',
    controller: 'ConsumerBudgetSelectionCtrl',
    resolve: {
      budgets : ['budgetService', function(budgetService) {
        return budgetService.getBudgets();
      }],
      permission: ['$q','requestHelperService', function ($q, requestHelperService) {
          var d = $q.defer();
          if (requestHelperService.getSelectedPrintShopsStatus()) {
            d.resolve();
          } else {
            d.reject('Canceled');
          }
          return d.promise;
        }]
    }
  })
  .state('consumer.printshop', {
    url: '/printshops/:printshopid',
    templateUrl: '/app/components/consumer/views/printshop-page.html',
    controller: 'ConsumerPrintshopPageCtrl',
    resolve: {
      printshop : ['printshopService', '$stateParams',
      function (printshopService, $stateParams) {
        return printshopService.getPrintshop($stateParams.printshopid);
      }],
      reviews: ['reviewsService', '$stateParams',
      function (reviewsService, $stateParams) {
        return reviewsService.getPrintshopReviews($stateParams.printshopid);
      }]
    }
  })

  /*PrintShop*/

  /*Employee*/
  .state('employee', {
    abstract: true,
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
    controller: 'PendingRequestsCtrl',
    resolve: {
      pendingPrintRequests: ['pendingPrintRequestsService', function(pendingPrintRequestsService) {
        return pendingPrintRequestsService.getPendingRequests();
      }]
    }
  })
  .state('employee.consult', {
    url: '/pending/:requestid',
    templateUrl: '/app/components/printshop/employee/views/employee-request-consult.html',
    controller: 'ConsultRequestCtrl',
    resolve: {
      pendingPrintRequest: ['pendingPrintRequestsService', '$stateParams',
      function (pendingPrintRequestsService, $stateParams) {
        return pendingPrintRequestsService.getRequest($stateParams.requestid);
      }]
    }
  })
  .state('employee.satisfied', {
    url: '/satisfied',
    templateUrl: '/app/components/printshop/employee/views/employee-requests-satisfied.html',
    controller: 'SatisfiedRequestsCtrl',
    resolve: {
      satisfiedPrintRequest: ['satisfiedPrintRequestsService',
      function (satisfiedPrintRequestsService) {
        return satisfiedPrintRequestsService.getSatisfiedRequests();
      }]
    }
  })
  .state('employee.history', {
    url: '/history',
    templateUrl: '/app/components/printshop/employee/views/employee-requests-history.html',
    controller: 'HistoryRequestsCtrl',
    resolve: {
      historyPrintRequests: ['historyPrintRequestsService',
      function (historyPrintRequestsService) {
        return historyPrintRequestsService.getHistoryRequests();
      }]
    }
  })

  /*Manager*/
  .state('manager', {
    abstract: true,
    url: '/manager/:username',
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
  .state('manager.mainpage', {
    url: '/mainpage',
    templateUrl: '/app/components/printshop/manager/views/manager-printshop-page.html',
    controller: 'ManagerPrintshopPageCtrl',
    resolve: {
      printshop : ['managerPrintshopService',
      function (managerPrintshopService) {
        return managerPrintshopService.getPrintshop();
      }],
      reviews: ['managerPrintshopService', '$stateParams',
      function (managerPrintshopService, $stateParams) {
        return managerPrintshopService.getPrintshopReviews($stateParams.printshopid);
      }]
    }
  })
  .state('manager.stats', {
    url: '/stats',
    templateUrl: '/app/components/printshop/manager/views/manager-stats.html',
    controller: 'ManagerStatsCtrl',
    resolve: {
      stats: ['pshopStatsService', function(pshopStatsService) {
        return pshopStatsService.getStats();
      }]
    }
  })
  .state('manager.pricetable', {
    url: '/pricetable',
    templateUrl: '/app/components/printshop/manager/views/pricetable/manager-pricetable.html',
    controller: 'ManagerPriceTableCtrl',
    resolve: {
      priceTable: ['priceTableService', function(priceTableService) {
        return priceTableService.getPriceTable();
      }]
    }
  })
  .state('manager.employees', {
    url: '/employees',
    templateUrl: '/app/components/printshop/manager/views/manager-employees.html',
    controller: 'ManagerEmployeesCtrl',
    resolve: {
      employeesList: ['employeesService', function(employeesService) {
        return employeesService.getEmployeesList();
      }]
    }
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
      pendingRequests: ['pendingRequestsService', function(pendingRequestsService) {
        return pendingRequestsService.getPendingRequests();
      }]
    }
  })
  .state('admin.request', {
    url: '/requests/:requestid',
    templateUrl: '/app/components/admin/views/admin-request.html',
    controller: 'AdminPendingRequestDetailCtrl',
    resolve: {
      pendingRequest: ['pendingRequestsService', function (pendingRequestsService) {
        return pendingRequestsService.getCurrentRequest();
      }]
    }
  })
  .state('admin.printshops', {
    url: '/printshops',
    templateUrl: '/app/components/admin/views/admin-printshops.html',
    controller: 'AdminPrintShopsCtrl',
    resolve: {
      printshops: ['printshopService',
      function (printshopService) {
        return printshopService.getAllPrintshops();
      }]
    }
  });

}]);
