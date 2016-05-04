angular.module('ProxyPrint').factory('fileTransferService',['Upload','$timeout', function (Upload, $timeout) {

    var service = {};
    service.TransferFiles = function (files, callback) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.$error) {
                Upload.upload({
                    url: 'http://localhost:8080/consumer/upload',
                    data: {
                        file: file,
                        spec: files[i].specs
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        console.log('file: '+resp.config.data.file.name);
                        console.log('Response: ' + JSON.stringify(resp.data));
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                        evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage +'% ' + evt.config.data.file.name + '\n');
                    });
                }
            }
        };

    service.setFiles = function (files){
        angular.forEach(files, function(file){
            file.specs = [];
        });

        service.files = files;
    }

    service.getFiles = function () {
        return service.files;
    }

    return service;
}]);
