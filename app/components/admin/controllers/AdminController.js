
var app = angular.module('adminController',[]);

app.controller('RequestsController', function() {
    this.p=1;
    this.pendingRequests = staticRequests;
});

var staticRequests = [
    {
        id : 123,
        client : 'Video Norte',
        date : '050220161624',
    },
    {
        id : 124,
        client : '17A',
        date : '060220161552',
    },
    {
        id : 125,
        client : 'Copy Scan',
        date : '070220161730',
    }
];
