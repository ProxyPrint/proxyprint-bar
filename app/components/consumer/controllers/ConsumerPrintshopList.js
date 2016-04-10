angular.module('ProxyPrint')
   .controller('ConsumerPrintshopList', ['$scope','ngTableParams' , function ($scope, ngTableParams) {

      $scope.printshops = [{
            name: "Impressões Jerónimo",
            address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
            rating: 3.5
         }, {
            name: "Copy & Paste",
            address: "Rua Augusto Semedo, 1086 Barrada",
            rating: 4.7
         },{
            name: "Print4U",
            address: "Alameda Ana Fernandes, Porto",
            rating: 5
         }
      ];

      $scope.tableParams = new ngTableParams({}, {dataset: $scope.printshops});

}]);
