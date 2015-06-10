var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var Router = require('routes');
var router = Router();
var db = require('orchestrate')(process.env.ORCHESTRATE_KEY);
var dbName = "fivePointsEmployees";

var sayHello = function(){
	console.log("Hello say Hello")
}

var grabCollection = db.get(dbName, 'employees')
	.then(function (result) {
		console.log(result.body);
		return result.body;
	})
	.fail(function (err) {
		console.log(err)
		return;
	});


router.addRoute("/api", grabCollection)


http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
    var match = router.match(uri);
    console.log("Here is match");
    if (match != undefined) {
    	if (match.route == '/api'){
    		match.fn.apply();
  		}
    	}
    	console.log(match);
    ;

/*
    var match = router.match(uri);
    match.fn(req,res,match);
  console.log(uri);
  console.log("this is filename")
  console.log(filename);

  */


  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

 
    if (fs.statSync(filename).isDirectory()) filename += 'public/fivepoints.html';
 
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