// Example
 
// Here's a client-server pair that show you how to listen for the `upgrade` event using `http.getAgent`:
 
var http = require('http');
var net = require('net');
 
// Create an HTTP server
var srv = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});

srv.on('upgrade', function(req, socket, upgradeHead) {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n\r\n');
 
  socket.ondata = function(data, start, end) {
    socket.write(data.toString('utf8', start, end), 'utf8'); // echo back
  };
});
 
// now that the server is running...
srv.listen(1337, '127.0.0.1', function() {
 
  // ...make a request
  var options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };
 
  var req = http.request(options);
  req.end();
 
  req.on('upgrade', function(res, socket, upgradeHead) {
    console.log('got upgraded!');
    socket.end();
    process.exit(0);
  });
});

 
