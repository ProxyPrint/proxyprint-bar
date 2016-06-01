var cluster = require('cluster');
var compression = require('compression');
var express = require('express');
var minify = require('express-minify');
var redirect = require("express-redirect");
var bodyParser = require('body-parser');
var requestify = require('requestify');
var app = express();

var ngrok = require('ngrok');
var externalURL = "";
var port = 9000;
ngrok.connect({
  proto: 'http',
  addr: port
}, function(err, url) {
  if (err) {
    console.log(err);
    return;
  }
  var tmp = url.split(":");
  externalURL = "https:" + tmp[1] + "/";
  var backendURL = process.env.BACKEND_URL || "http://localhost:8080/";
  var port = Number(process.env.PORT || 9000);

  if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    console.log('running on %d cpus, backendURL: %s', cpuCount, backendURL);
    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

  } else {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({
      extended: true
    })); // for parsing application/x-www-form-urlencoded
    app.use(compression());
    app.use(minify());
    redirect(app);

    app.use(express.static(__dirname + '/'));

    app.get("/config", function(req, res) {
      res.send(backendURL);
    });

    app.get("/tunnel", function(req, res) {
      res.send(externalURL);
    });

    app.post("/paypal/ipn/:id", function(req, res) {
      requestify.post(backendURL + "/paypal/ipn/:id", req.body).then(function(response) {
        response.getBody();
        res.send(response.body);
      });
    });

    var server = app.listen(port, function() {
      console.log('listening on port %d', server.address().port);
    });
  }

});
ngrok.connect(port);
