// Example
 
server.on('connection', function (stream) {
    console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection'))); // [ [Function] ]