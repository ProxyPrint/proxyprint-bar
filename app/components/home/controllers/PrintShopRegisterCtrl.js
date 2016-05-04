angular.module('Auth').controller('PrintShopRegisterCtrl', ['$scope', '$rootScope', '$http', '$location', 'authenticationService', '$state', '$cookieStore',
  function($scope, $rootScope, $http, $location, authenticationService, $state, $cookieStore) {
    // reset login status
    authenticationService.ClearCredentials();

    $scope.register = function() {
      $scope.dataLoading = true;
      var data = {
        "managerName": $scope.managerName,
        "managerEmail": $scope.managerEmail,
        "managerPassword": $scope.managerPassword,
        "pShopAddress": $scope.pShopAddress,
        "pShopNIF": $scope.pShopNIF,
        "pShopName": $scope.pShopName
      }

      getLatitudeLongitude($scope.pShopAddress, function(result) {
        data.pShopLatitude = result.geometry.location.lat();
        data.pShopLongitude = result.geometry.location.lng();
        $http.post(backendURLService.getBaseURL()+"request/register", data).success(function(response) {
          alert("Pedido registado! Será notificado via email em breve!");
          $location.path('/printshop');
        });
      });

    };

    function getLatitudeLongitude(address, callback) {
      // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
      address = address || 'Ferrol, Galicia, Spain';
      // Initialize the Geocoder
      geocoder = new google.maps.Geocoder();
      if (geocoder) {
        geocoder.geocode({
          'address': address
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            callback(results[0]);
          }
        });
      }
    }
  }
]);
