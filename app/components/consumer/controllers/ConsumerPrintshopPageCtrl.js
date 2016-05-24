angular.module('ProxyPrint')
   .controller('ConsumerPrintshopPageCtrl',
      ['$scope','NgMap','printshop', 'reviews', 'printshopService','$uibModal', 'reviewsService', '$cookieStore', '$state',
      function ($scope, NgMap,printshop, reviews, printshopService, $uibModal, reviewsService, $cookieStore, $state) {



      $scope.printshop = {
        id: printshop.data.id,
        name: printshop.data.name,
        address: printshop.data.address,
        rating: printshop.data.avgRating,
        latitude: printshop.data.latitude,
        longitude: printshop.data.longitude,
        reviews: reviews.data
      }

      console.log($scope.printshop);

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

       $scope.reviewPrintshop = function () {

         var modalInstance = $uibModal.open({
           animation: true,
           templateUrl: 'app/components/consumer/views/review-printshop-modal.html',
           controller: 'ReviewPrintshopCtrl',
           size: 'md'
         });

         modalInstance.result.then(function(review) {
           console.log(review);
           reviewsService.addReview($scope.printshop.id, review);
           $state.go('consumer.printshop');
         });
       };





}]);


angular.module('ProxyPrint').controller('DisplayPricetableCtrl',
         ['$scope', '$uibModalInstance','pricetable', 'priceTableService',
         function ($scope, $uibModalInstance, pricetable, priceTableService) {

        $scope.pricetable = pricetable.data;

        $scope.getPresentationStringForCovers = function(key) {
          return priceTableService.getPresentationStringForCovers(key);
        };

        $scope.closeModal = function () {
          $uibModalInstance.dismiss('cancel');
        };
}]);

angular.module('ProxyPrint').controller('ReviewPrintshopCtrl',
   ['$scope', '$uibModalInstance',
   function ($scope, $uibModalInstance) {

        $scope.score = 1;


        $scope.reviewPrintshop = function() {
          var review = new Object();
          review.description = $scope.content;
          review.rating = $scope.score;
          $uibModalInstance.close(review);
        };

        $scope.closeModal = function () {
          $uibModalInstance.dismiss('cancel');
        };
  }]);
