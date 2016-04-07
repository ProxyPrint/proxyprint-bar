
var app = angular.module('ProxyPrint');

app.controller('RequestsController', function() {
    this.pendingRequests = staticContent;
});

app.controller('ReproController', function() {
    this.listRepro = staticContent;
});

var staticContent = [
    {
        id : 1,
        name : 'Video Norte',
        admissionDate : '12-03-2015 17:07',
        registerDate : '12-03-2015 17:37',
        manager : 'Manuel Barbosa'
    },
    {
        id : 2,
        name : '17A',
        admissionDate : '30-03-2015 15:30',
        registerDate : '30-03-2015 16:00',
        manager : 'Joaquim Silva'
    },
    {
        id : 3,
        name : 'Copy Scan',
        admissionDate : '05-04-2015 11:15',
        registerDate : '05-04-2015 11:45',
        manager : 'Francisco Alves'
    }
];
