angular.module('ProxyPrint')
   .controller('ConsumerPrintshopPageCtrl', ['$scope', function ($scope) {

      $scope.printshop = {
        name: "Impressões Vasconcelos",
        address: "Rua Margarida Filipe Pinto Gomes, 35 Braga",
        rating: 4,
        latitude: 54.2222,
        longitude: 23.1123,
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

}]);
