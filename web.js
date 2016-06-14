var fs = require('fs');
var loadbalance = require('loadbalance')
var cluster = require('cluster');
var compression = require('compression');
var express = require('express');
var minify = require('express-minify');
var redirect = require("express-redirect");
var app = express();
var backendURL = process.env.BACKEND_URL || "http://localhost:8080/"
var port = Number(process.env.PORT || 9000);

var app_servers;
var app_servers_arr = [];

if (backendURL == "file") {
  var array = fs.readFileSync('servers.txt').toString().split("\n");
  for (i in array) {
    var aux = array[i].trim();
    if (aux != "") app_servers_arr.push(array[i]);
  }
  app_servers = loadbalance.roundRobin(app_servers_arr);
} else {
  app_servers_arr.push(backendURL);
  app_servers = loadbalance.roundRobin(app_servers_arr);
}

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  console.log('running on %d cpus, backendURL: %s', cpuCount, backendURL);
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

} else {
  app.use(compression());
  redirect(app);

  app.use(express.static(__dirname + '/'));

  app.get("/config", function(req, res) {
    res.send(app_servers.pick());
  });

  var server = app.listen(port, function() {
    console.log('listening on port %d', server.address().port);
  });
}
