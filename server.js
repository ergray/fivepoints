var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var Router = require('routes');
var router = Router();
var db = require('orchestrate')(process.env.ORCHESTRATE_KEY);
var dbName = "fivePointsEmployees";
var date = Date.now();
var countDown = 0;

var sayHello = function(){
	console.log("API is triggered" + date);
	countDown++;
	console.log(countDown);
};

var orchestrateDB = function(request, response){db.get(dbName, 'employees')
	.then(function (result) {
		countDown++;
		console.log("logged from grab success " + countDown);
		console.log("Request and reponse");
		console.log(JSON.stringify(result.body.fivepoints));
		response.end(JSON.stringify(result.body.fivepoints));
	})
	.fail(function (err) {
		countDown++;
		console.log("logged from grab fail " + countDown);
		console.log(err)
		return;
	})
};
	

var grabCollection = function(request, response){
	console.log("Here is request, response");
	//console.log(request.body);
	//console.log(response.body);
	return orchestrateDB(request, response);
};


router.addRoute("/api", grabCollection);

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
	, filename = path.join(process.cwd(), uri);
	console.log("here is uri");
	console.log(uri);
	console.log("here is filename");
	console.log(filename);
	console.log("and here is what router.match sees");
	console.log(router.match(uri));
	var match = router.match(uri);
	if (match != undefined){
		match.fn(request, response)
		//router.match(uri).fn.apply(null, {request: request}, {response: response});
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