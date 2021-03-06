var net = require('net');

var DEFAULT_PORT_RANGE_START = 11000;

function testPortAsync(port, hostname) {
  return new Promise(function (fulfill, reject) {
    var server = net.createServer()
    server.listen(port, hostname, 1, function (err) {
      server.once('close', function () {
        setTimeout(() => fulfill(true), 0);
      });
      server.close();
    });
    server.on('error', function (err) {
      setTimeout(() => fulfill(false), 0);
    });
  });
}


function freePortRangeAsync(rangeSize, rangeStart, hostname) {
  rangeSize = rangeSize || 1;
  return new Promise(function (fulfill, reject) {
    var lowPort = rangeStart || DEFAULT_PORT_RANGE_START;
    var awaitables = [];
    for (var i = 0; i < rangeSize; i++) {
      awaitables.push(testPortAsync(lowPort + i, hostname));
    }
    return Promise.all(awaitables).then(function (results) {
      var ports = [];
      for (var i = 0; i < results.length; i++) {
        if (!results[i]) {
          return freePortRangeAsync(rangeSize, lowPort + rangeSize, hostname).then(fulfill, reject);
        }
        ports.push(lowPort + i);
      }
      fulfill(ports);
    });
  });
}

function freePortAsync(rangeStart, hostname) {
  return freePortRangeAsync(1, rangeStart, hostname).then(function (result) {
    return result[0];
  });
}

module.exports = freePortAsync;

module.exports.availableAsync = testPortAsync;
module.exports.rangeAsync = freePortRangeAsync;
