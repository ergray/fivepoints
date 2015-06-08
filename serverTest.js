var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var Router = require('routes');
var router = Router();
var db = require('orchestrate')(process.env.ORCHESTRATE_KEY);
var dbName = "fivePointsEmployees";
var date = Date.now();

var sayHello = function(){
	console.log("API is triggered" + date)
};

/*
var grabCollection = db.get(dbName, 'employees')
	.then(function (result) {
		console.log(result.body);
	})
	.fail(function (err) {
		console.log(err)
	});
*/

router.addRoute("/api", sayHello);
//router.addRoute("/");
/*
var serveFile = function(path){
	fs.readFile("/app/" + path, function(err, contents){
			if (err) {
				response.writeHead(500);
				response.end(err);
				return;
			}
			response.end(contents);
		})
};
*/
http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
	, filename = path.join(process.cwd(), uri);
	console.log("here is uri");
	console.log(uri);
	console.log("here is filename");
	console.log(filename);
	console.log("and here is what router.match sees");
	console.log(router.match(uri));
	//var match = router.match(uri);
	//match.serveFile(req, res, match)
	if (router.match(uri) != undefined){
		router.match(uri).fn.apply();
		return;
	}
	if (uri == "/"){
		fs.readFile("./public/fivepoints.html", 'utf8', function(err, contents){
			if (err) {
				response.writeHead(500);
				response.end(err);
				return;
			}
			response.end(contents);
		})
	} else {
		fs.readFile(filename, 'utf8', function(err, contents){
			if (err) {
				response.writeHead(500);
				response.end(err);
				return;
			}
			response.end(contents);
		})
	};
	/*};
	  fs.readFile(uri, function(err, contents){
			if (err) {
				response.writeHead(500);
				response.end(err);
				return;
			}
			response.end(contents);
		});*/
}).listen(process.env.PORT || 5000);