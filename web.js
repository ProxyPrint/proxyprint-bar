var cluster = require('cluster');
var compression = require('compression');
var express = require('express');
var minify = require('express-minify');
var redirect = require("express-redirect");
var app = express();
var backendURL = process.env.BACKEND_URL || "http://localhost:8080/"
var port = Number(process.env.PORT || 9000);

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    console.log('running on %d cpus, backendURL: %s', cpuCount, backendURL);
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

} else {
    app.use(compression());
    app.use(minify());
    redirect(app);

    app.use(express.static(__dirname + '/'));

    app.get("/config", function(req, res) {
        res.send(backendURL);
    });

    var server = app.listen(port, function() {
        console.log('listening on port %d', server.address().port);
    });
}
