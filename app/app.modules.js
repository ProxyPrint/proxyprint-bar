angular.module('ProxyPrint', ['Auth','ui.router','ngCookies', 'uiRouterStyles','ngFileUpload','angular-notification-icons', 'ui.bootstrap', 'rzModule', 'ngAnimate', 'ui.select', 'ngSanitize', 'infinite-scroll','ui-notification', 'angularSpinner'])
   .run(['$rootScope', '$location', '$cookieStore', '$http',

    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        /*$rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
                $location.path('/');
            }
        });*/
    }])
    .config(['NotificationProvider', function(NotificationProvider) {
      NotificationProvider.setOptions({
        delay: 7000,
        startTop: 60,
        startRight: 20,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
        });
    }])
    .config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
      usSpinnerConfigProvider.setTheme('bigBlue', {color: '#3A6DB0', radius: 30});
    }]);


/** Registration**/
angular.module('Auth', []);
