var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var Router = require('routes');
var router = Router();
var noop = function(){};
var db = require('orchestrate')(process.env.ORCHESTRATE_KEY);
var dbName = "fivePointsEmployees";


router.addRoute("/api", function(){
	console.log("inside of api")
});

  	db.get(dbName, "employees")
  		.then(function (result) {
  			console.log(result.body)
  		});

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  console.log(uri);
  if (uri.pathname == "/api") {

  	response.write("End of response, hi API, still don't know where inside of api is")
  };
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