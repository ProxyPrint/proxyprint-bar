angular.module('ProxyPrint')
   .controller('ConsumerPrintshopPageCtrl', ['$scope','NgMap','printshop', function ($scope, NgMap,printshop) {

     console.log(printshop);

      $scope.printshop = {
        name: printshop.data.name,
        address: printshop.data.address,
        rating: printshop.data.avgRating,
        latitude: printshop.data.latitude,
        longitude: printshop.data.longitude,
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
