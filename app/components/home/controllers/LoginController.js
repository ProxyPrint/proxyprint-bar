angular.module('Auth').controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$state', '$cookieStore',
    function($scope, $rootScope, $location, AuthenticationService, $state, $cookieStore) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {

                if (response.success) {
                    if(response.user.roles[0] == "ROLE_MANAGER") {
                      AuthenticationService.SetCredentials($scope.username, $scope.password);
                      $state.go('manager', {"username": $scope.username});
                    }
                    else if (response.user.roles[0] == "ROLE_EMPLOYEE") {
                      AuthenticationService.SetCredentials($scope.username, $scope.password);
                      $state.go('employee', {"username": $scope.username});
                    }
                    else if(response.user.roles[0] == "ROLE_USER") {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(function(position) {
                              $rootScope.position = position;
                              console.log($rootScope.position.coords.latitude);
                              console.log($rootScope.position.coords.longitude);
                          });
                      }

                      AuthenticationService.SetCredentials($scope.username, $scope.password);
                      $state.transitionTo('consumer');
                      $location.path('/consumerID');
                    }
                } else {
                    $scope.error = "Dados de login inválidos!";
                    $scope.dataLoading = false;
                }
            });
        };
    }
]);
