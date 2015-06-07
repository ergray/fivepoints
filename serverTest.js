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
	})
	.fail(function (err) {
		console.log(err)
	});


router.addRoute("/api", grabCollection);
router.addRoute("/");
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
	console.log(process.argv);
	console.log(request.url);
	//console.log(request.path);
	//console.log(request.body);
	var uri = url.parse(request.url).pathname
	, filename = path.join(process.cwd(), uri);
	console.log("here is uri");
	console.log(uri);
	console.log("here is filename");
	console.log(filename);
	//var match = router.match(uri);
	//match.serveFile(req, res, match)
	if (uri == "/"){
		fs.readFile("./public/fivepoints.html", function(err, contents){
			if (err) {
				response.writeHead(500);
				response.end(err);
				return;
			}
			console.log(contents);
			response.end(contents);
		})
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