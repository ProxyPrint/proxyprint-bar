angular.module('ProxyPrint')
   .controller('ConsumerPrintshopPageCtrl',
      ['$scope', 'printshop', 'reviews', 'printshopService','$uibModal', 'reviewsService', '$cookieStore', '$state', 'toasterService',
      function ($scope,printshop, reviews, printshopService, $uibModal, reviewsService, $cookieStore, $state, toasterService) {

      $scope.limit = 5;

      $scope.loadMore = function() {
          var incremented = $scope.limit + 5;
          $scope.limit = incremented > $scope.printshop.reviews.length ? $scope.printshop.reviews.length : incremented;

        };

      $scope.printshop = {
        id: printshop.data.id,
        name: printshop.data.name,
        address: printshop.data.address,
        rating: printshop.data.avgRating,
        latitude: printshop.data.latitude,
        longitude: printshop.data.longitude,
        reviews: reviews.data
      }

      console.log($cookieStore.get('globals').currentUser);


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
           addReview(review);
           $state.go('consumer.printshop');
         });
       };


       addReview = function (review) {
         reviewsService.addReview($scope.printshop.id, review)
          .success(function () {
            review.username = $cookieStore.get('consumerName')
            $scope.printshop.reviews.unshift(review);
            toasterService.notifySuccess("A avaliação foi inserida!");

          })
          .error(function () {
            toasterService.notifyWarning("Ocorreu um erro! A avalição não foi criada.");
          })
       }





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
