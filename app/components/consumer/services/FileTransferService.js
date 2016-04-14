angular.module('ProxyPrint').factory('FileTransferService',['Upload','$timeout', function (Upload, $timeout) {

   var service = {};
   service.TransferFiles = function (files) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.$error) {
          Upload.upload({
              url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
              data: {file: file}
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

   return service;
}]);
