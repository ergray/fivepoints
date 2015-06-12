var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var Router = require('routes');
var router = Router();
var db = require('orchestrate')("0d1af55c-0471-4fce-9ff8-bdb92c6f8184");
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
		response.end(JSON.stringify(result.body.fivepoints));
	})
	.fail(function (err) {
		countDown++;
		console.log("logged from grab fail " + countDown);
		console.log(err)
		return;
	})
};

var orchestratePUT = function(request, response){
    request.on('data', function(chunk) {
      console.log("Received body data:");
      console.log(chunk.toString());
      var newData = chunk.toString();
      return newData;
    });
 };  

var grabCollection = function(request, response){
	return orchestrateDB(request, response);
};


router.addRoute("/api", grabCollection);
router.addRoute("/apiPUT", orchestratePUT);

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
	, filename = path.join(process.cwd(), uri);
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