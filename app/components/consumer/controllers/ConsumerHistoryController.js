angular.module('ProxyPrint')
   .controller('ConsumerHistoryController', ['$scope' , function ($scope) {

      $scope.requests = [{
            reqID: 1,
            ts_beggining: "22/03/2016 15:45",
            ts_processed: "22/03/2016 17:43",
            printshop: "Impressões Victor",
            cost: 2.33
         }, {
            reqID: 2,
            ts_beggining: "24/03/2016 15:33",
            ts_processed: "24/03/2016 15:59",
            printshop: "Impressões Alameda",
            cost: 3.55
         }
      ];

}]);
