angular.module('ProxyPrint')
   .controller('ConsumerPrintshopPageCtrl', ['$scope','NgMap','printshop', 'printshopService','$uibModal',
      function ($scope, NgMap,printshop, printshopService, $uibModal) {

     console.log(printshop);

      $scope.printshop = {
        id: printshop.data.id,
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

        /** Google Maps **/

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

       /** Pricetable Modal **/

       $scope.displayPricetable = function() {

         var modalInstance = $uibModal.open({
           animation: true,
           templateUrl: 'app/components/consumer/views/display-pricetable-modal.html',
           controller: 'DisplayPricetableCtrl',
           size: 'md',
           resolve: {
             pricetable:  ['printshopService',
              function (printshopService) {
               return printshopService.getPrintshopPricetable($scope.printshop.id);
             }]
           }
         });

         modalInstance.result.then(function() {
           $state.go('consumer.printshop');
         });
       };





}]);


      angular.module('ProxyPrint').controller('DisplayPricetableCtrl',
         ['$scope', '$uibModalInstance','pricetable',
         function ($scope, $uibModalInstance, pricetable) {

        $scope.pricetable = pricetable.data;

        $scope.closeModal = function () {
          console.log($scope.pricetable);
          $uibModalInstance.dismiss('cancel');
        };
      }]);
