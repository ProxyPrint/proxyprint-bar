angular.module('ProxyPrint')

.controller('ConsumerSpecsController', ['$scope' , function($scope, myModal) {

    // Model to JSON for demo purpose
    $scope.$watch('files', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.files = {
        lists: {"Ficheiros": [
            {
                name: "Slides 1-10",
                specs: []
            }, {
                name: "Slides 10-20",
                specs: []
            },{
                name: "Slides 20-30",
                specs: []
            },{
                name: "Slides 30-40",
                specs: []
            },{
                name: "Slides 40-50",
                specs: []
            },{
                name: "Slides 50-60",
                specs: []
            }
        ]}
    };

    $scope.files2Print = {
        files: []
    };

    $scope.specs = {
        selected: null,
        lists: {"Especificações": [
            {
                id: 1,
                format: "A4",
                sides: "Frente e Verso",
                colors: "Preto e Branco",
                finishes: "Agrafar",
                opt: {
                    cover: null,
                    rings: null,
                }
            }, {
                id: 2,
                format: "A5",
                sides: "Frente e Verso",
                colors: "Cores",
                finishes: "Encadernar",
                opt: {
                    cover: "PVC Opaco",
                    rings: "Espiral"
                }
            }, {
                id: 3,
                format: "A3",
                sides: "Frente e Verso",
                colors: "Cores",
                finishes: "Encadernar",
                opt: {
                    cover: "PVC Opaco",
                    rings: "Espiral"
                }
            }
        ]}
    };
}]);
