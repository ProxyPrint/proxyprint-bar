angular.module('ProxyPrint')
   .controller('ConsumerPrintshopList', ['$scope','$state', function ($scope,$state) {

      $scope.printshops = [{
            id: 1,
            name: "Impressões Jerónimo",
            address: "Avenida Dr. Filipe Veríssimo, 19 Lourimé",
            rating: 3
         }, {
            id: 2,
            name: "Copy & Paste",
            address: "Rua Augusto Semedo, 1086 Barrada",
            rating: 4
         },{
            id: 3,
            name: "Print4U",
            address: "Alameda Ana Fernandes, Porto",
            rating: 5
         }
      ];

      $scope.loadPrintshop = function (index) {
        $state.go('printshoppage', {printshopid: $scope.printshops[index].id});
      }

}]);
