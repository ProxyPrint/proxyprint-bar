var cluster = require('cluster');
var compression = require('compression');
var express = require('express');
var minify = require('express-minify');
var app = express();
var port = Number(process.env.PORT || 9000);

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  console.log('running on %d cpus', cpuCount);
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

} else {
  app.use(compression());
  app.use(minify());
  app.use(express.static(__dirname + '/'));
  var server = app.listen(port, function() {
    console.log('listening on port %d', server.address().port);
  });
}
