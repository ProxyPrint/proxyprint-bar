var cluster = require('cluster');
var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression());

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  console.log('running on %d cpus', cpuCount);
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

} else {
  var port = Number(process.env.PORT || 9000);

  app.use(express.static(__dirname + '/'));
  var server = app.listen(port, function() {
    console.log('listening on port %d', server.address().port);
  });
}
