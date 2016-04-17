angular.module('ProxyPrint', ['Auth', 'ui.router','ngCookies', 'uiRouterStyles','ngFileUpload','angular-notification-icons'])
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
    }]);


/** Registration**/
angular.module('Auth', []);
