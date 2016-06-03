angular.module('ProxyPrint').factory('fileTransferService', ['Upload', '$timeout', 'backendURLService', '$cookieStore', '$state', function(Upload, $timeout, backendURLService, $cookieStore, $state) {

    var service = {};
    service.processedFiles = {};
    service.processedFiles.files = {};

    var readPages = function(file, callback) {
        var reader = new FileReader();
        //callback quando filereader acaba
        reader.onload = function(event) {
            var contents = event.target.result;
            PDFJS.getDocument(contents).then(function(doc) {
                var numPages = doc.numPages;
                callback({
                    "name": file.name,
                    "pages": numPages,
                    "specs": file.specs
                });
            });
        };
        //callback quando filereader falha
        reader.onerror = function(event) {
            console.error("File could not be read! Code " + event.target.error.code);
            callback();
        };
        //ler ficheiro
        reader.readAsArrayBuffer(file);
    };

    service.ProcessFiles = function(files, callback) {
        var filesToStore = [];
        var queue = async.queue(readPages, 1);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            // Attention data is being lost here!
            filesToStore.push(file.name);
            if (!file.$error) {
                queue.push(files[i], function(processedFile) {
                    service.processedFiles.files[processedFile.name] = {
                        specs: processedFile.specs,
                        pages: processedFile.pages
                    };
                });
            }
        }
        $cookieStore.put("uploadedFilesNames", filesToStore);
        queue.drain = function() {
          console.log("DRAIN");
        };
    };

    service.setFiles = function(files) {
        angular.forEach(files, function(file) {
            file.specs = [];
        });

        service.files = files;
    };

    service.getFiles = function() {
        return service.files;
    };

    service.getProcessedFiles = function() {
        return service.processedFiles;
    };

    return service;
}]);
