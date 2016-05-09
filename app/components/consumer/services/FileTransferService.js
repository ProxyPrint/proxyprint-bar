angular.module('ProxyPrint').factory('fileTransferService', ['Upload', '$timeout', 'backendURLService', '$cookieStore', 'printShopListService', function(Upload, $timeout, backendURLService, $cookieStore, printShopListService) {

    var service = {};
    service.processedFiles = {};
    service.processedFiles.printshops = printShopListService.getSelectedPrintShopsIDs();
    service.processedFiles.files = [];

    service.TransferFiles = function(files, callback) {
        var filesToStore = [];
        for (var i = 0; i < files.length; i++) {
            var tmp;
            var file = files[i];

            // Attention data is being lost here!
            filesToStore.push(file.name);

            if (!file.$error) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    var contents = event.target.result;
                    PDFJS.getDocument(contents).then(function(doc) {
                        var numPages = doc.numPages;
                        console.log('# Document Loaded');
                        console.log('Number of Pages: ' + numPages);
                        service.processedFiles.files[file.name] = {
                            specs: file.specs,
                            pages: numPages
                        }
                        console.log(service.processedFiles);
                    });
                };

                reader.onerror = function(event) {
                    console.error("File could not be read! Code " + event.target.error.code);
                };

                reader.readAsArrayBuffer(file);
            }
        }

        // Persist files in cookies
        $cookieStore.put("uploadedFilesNames", filesToStore);
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
    }

    return service;
}]);
