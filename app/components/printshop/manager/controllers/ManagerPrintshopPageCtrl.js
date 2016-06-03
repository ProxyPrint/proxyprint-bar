angular.module('ProxyPrint')
.controller('ManagerPrintshopPageCtrl', ['$scope','printshop', 'reviews', '$cookieStore', function ($scope, printshop, reviews, $cookieStore) {

    console.log(printshop.data.printshop);
    console.log(reviews.data);
    $cookieStore.put("pshopBalance", printshop.data.printshop.balance);

    $scope.data = printshop.data.printshop;
    $scope.printshop = {
        name: $scope.data.name,
        address: $scope.data.address,
        rating: $scope.data.avgRating,
        latitude: $scope.data.latitude,
        longitude: $scope.data.longitude,
        reviews: reviews.data
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: new google.maps.LatLng($scope.printshop.latitude, $scope.printshop.longitude),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        minZoom: 2
    });

    marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.printshop.latitude, $scope.printshop.longitude),
        title: "Character",
        map: map
    });




}]);
