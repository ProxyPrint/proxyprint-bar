angular.module('ProxyPrint').controller('HistoryRequestsCtrl', ['$scope',
      function($scope) {

   $scope.historyRequests = [
     { id: "1", consumer: "Carlos Santana", arrivalTimestamp: "11/7/2014 12:15", finishedTimestamp: "11/7/2014 12:22", employeeAttended: "Joaquim Machado", cost: "2,32 €", liftedTimestamp: "11/7/2014 14:15" },
     { id: "2", consumer: "Carlos Santana", arrivalTimestamp: "11/7/2014 11:15", finishedTimestamp: "11/7/2014 12:02", employeeAttended: "Daniel Caldas", cost: "1,11 €", liftedTimestamp: "11/7/2014 14:15"},
     { id: "3", consumer: "Carla Matias", arrivalTimestamp: "11/7/2014 10:15", finishedTimestamp: "11/7/2014 11:18", employeeAttended: "Daniel Caldas", cost: "4,90 €", liftedTimestamp: "11/7/2014 14:15"},
     { id: "4", consumer: "Ana Sofia", arrivalTimestamp: "11/7/2014 02:15", finishedTimestamp: "11/7/2014 12:08", employeeAttended: "Brandão Machado", cost: "3,43 €", liftedTimestamp: "11/7/2014 14:15"}
   ];

}]);
