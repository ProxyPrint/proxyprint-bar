angular.module('ProxyPrint').factory('fileTransferService',['Upload','$timeout', 'backendURLService', '$cookieStore', function (Upload, $timeout, backendURLService, $cookieStore) {

  var service = {};
  service.TransferFiles = function (files, callback) {
    var filesToStore = [];
    for (var i = 0; i < files.length; i++) {
      var tmp;
      var file = files[i];

      // Attention data is being lost here!
      filesToStore.push(file.name);

      if (!file.$error) {
        Upload.upload({
          url: backendURLService.getBaseURL()+'consumer/upload',
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

      // Persist files in cookies
      $cookieStore.put("uploadedFilesNames", filesToStore);
    };

    service.setFiles = function (files){
      angular.forEach(files, function(file){
        file.specs = [];
      });

      service.files = files;
    };

    service.getFiles = function () {
      return service.files;
    };

    return service;
  }]);
