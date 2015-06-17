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

var orchestrateDB = function(request, response){db.list(dbName)
	.then(function (result) {
		var unfilteredData = result.body.results[0].value;
		countDown++;
		var dataArray = []
		var data = '';
		var testData = ''
		for (i = 0; i <result.body.results.length; i++){
		dataArray.push(result.body.results[i].value);
		}		
		response.end(JSON.stringify(dataArray), null, function(){
		});
	})
	.fail(function (err) {
		countDown++;
		console.log("logged from grab fail " + countDown);
		console.log(err)
		return;
	})
};

var orchestratePUT = function(request, response){
	var data = ""
    request.on('data', function(chunk) {
     data += chunk.toString();
    });
    response.end(JSON.stringify(data), null, function(){
	var parsedJSON = JSON.parse(data);
    	db.post(dbName, parsedJSON)
    	.then(function(result){
    		console.log("Success from post!");
    	})
    	.fail(function (error){
    		console.log("here is the data");
    		console.log(data);
    		console.log("HERE IS THE ERROR");
    		console.log(error.body)
    	});
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
	console.log(uri);
	var match = router.match(uri);
	if (match != undefined){
		match.fn(request, response)
		//router.match(uri).fn.apply(null, {request: request}, {response: response});
		return;
	}

	if (uri == "/favicon.ico"){
		return;
	}
	if (uri == "/"){
		fs.readFile("./public/fivepoints.html", 'utf8', function(err, contents){
			if (err) {
				console.log("error at / readfile")
				response.writeHead(500);
				response.end(err);
				return;
			}
			response.end(contents);
		})
	} else {
		fs.readFile(filename, 'utf8', function(err, contents){
			if (err) {
				console.log(filename);
				console.log("error at secondary readfile")
				response.writeHead(500);
				response.end(err);
				return;
			}
			response.end(contents);
		})
	};
}).listen(process.env.PORT || 5000);