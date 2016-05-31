var cluster = require('cluster');
var compression = require('compression');
var express = require('express');
var minify = require('express-minify');
var redirect = require("express-redirect");
var app = express();

var ngrok = require('ngrok');
var externalURL="";
var port = 8080;
ngrok.once('connect', function (url) {
  externalURL=url+"/";

  // Write external URL to file
  var fs = require('fs');
  fs.writeFile("/tmp/externalURL", externalURL, function(err) {
    if(err) { return console.log(err); }
  });

  var backendURL = process.env.BACKEND_URL || externalURL;
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

});
ngrok.connect(port);
