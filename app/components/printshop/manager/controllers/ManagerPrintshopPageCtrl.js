angular.module('ProxyPrint')
   .controller('ManagerPrintshopPageCtrl', ['$scope','printshop', function ($scope,printshop) {

     console.log(printshop.data.printshop);
     $scope.data = printshop.data.printshop;
      $scope.printshop = {
        name: $scope.data.name,
        address: $scope.data.address,
        rating: $scope.data.avgRating,
        latitude: $scope.data.latitude,
        longitude: $scope.data.longitude,
        reviews: [
          {
          user: "Rogério",
          date: new Date(),
          content: "Uma reprografia extremamente prestável!",
          score: 3
          },{
          user: "Filipe",
          date: new Date(),
          content: "Que porcaria... nunca mais volto!",
          score: 1
          },{
          user: "Mariana",
          date: new Date(),
          content: "A reprografia dos meus sonhos!",
          score: 5
          }
        ]};

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
