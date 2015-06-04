var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var db = require('orchestrate')(process.env.ORCHESTRATE_KEY);

http.createServer(function(request, response) {
 
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += '/fivepoints.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(process.env.PORT || 5000);
//}).listen(process.env.PORT || 5000);


var portCall = process.env.PORT || 5000
console.log("Listening on port " + portCall)
console.log(process.env);
console.log(process.env.ORCHESTRATE_KEY);