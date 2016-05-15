angular.module('ProxyPrint').controller('EmployeeBaseCtrl', ['$scope', '$cookieStore', 'authenticationService', '$state',
function($scope, $cookieStore, authenticationService, $state) {

    $scope.employee = $cookieStore.get('globals').currentUser;

    $scope.logout = function(){
        authenticationService.ClearCredentials();
        $state.go('printshop');
    };

    // Navigation highlight
    $scope.navigation = { pending: "active", satisfied: "", history: "" };
    $scope.navigate = function(where) {
        for(var i in $scope.navigation){ $scope.navigation[i] = ""; }
        $scope.navigation[where] = "active";
    };

}]);
