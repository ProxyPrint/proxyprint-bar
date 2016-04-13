angular.module('Auth').controller('PrintShopRegisterCtrl', ['$scope', '$rootScope', '$http', '$location', 'AuthenticationService', '$state', '$cookieStore',
  function($scope, $rootScope, $http, $location, AuthenticationService, $state, $cookieStore) {
    // reset login status
    AuthenticationService.ClearCredentials();

    $scope.register = function() {
      $scope.dataLoading = true;
      var data = {
        "managerName": $scope.managerName,
        "managerEmail": $scope.managerEmail,
        "managerPassword": $scope.managerPassword,
        "pShopAddress": $scope.pShopAddress,
        "pShopLatitude": 69,
        "pShopLongitude": 69,
        "pShopNIF": $scope.pShopNIF,
        "pShopName": $scope.pShopName
      }

      getLatitudeLongitude($scope.pShopAddress, function(result) {
        data.pShopLatitude = result.geometry.location.lat();
        data.pShopLongitude = result.geometry.location.lng();
        $http.post("http://localhost:8080/request/register", data).success(function(response) {
          $location.path('/printshop');
          alert("Pedido registado! Será notificado via email em breve!");
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
