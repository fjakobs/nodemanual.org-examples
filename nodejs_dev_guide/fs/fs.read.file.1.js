// Example: Reading a real file

var fs = require('fs');

fs.readFile('/someDir/someFile', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});