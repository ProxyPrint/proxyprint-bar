angular.module('ProxyPrint').factory('requestHelperService', function() {

    var service = {};
    service.submittedFiles = false;
    service.choseSpecs= false;
    service.selectedPrintshops = false;


    /*Submitted Files - part 1*/
    service.getSubmittedFilesStatus = function () {
      return service.submittedFiles;
    }

    service.setSubmittedFilesStatus = function (boolean) {
      service.submittedFiles = boolean;
    }

    /*Specs Status - part 2*/
    service.getSpecsStatus = function () {
      return service.choseSpecs;
    }

    service.setSpecsStatus = function (boolean) {
      service.choseSpecs = boolean;
    }

    /*Select printshops for the budget request - Part 3 */
    service.getSelectedPrintShopsStatus = function () {
      return service.selectedPrintshops;
    }

    service.setSelectedPrintShopsStatus = function (boolean) {
      service.selectedPrintshops = boolean;
    }

    service.resetRequest = function () {
      service.sbumittedFiles = service.choseSpecs = service.selectedPrintshops = false;
    }



    return service;
});
