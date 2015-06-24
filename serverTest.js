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

var sayHello = function(request, response){
console.log("ok triggered")
console.log(request.method);
if (request.method == "POST"){
	console.log("you got a post bro")
} else if (request.method == "DELETE"){
	console.log("burn it down");
};
response.end();
};

var chooseMethod = function(request, response){
	request = request;
	response = response;
	console.log(request.method);
	console.log(request.url);
	if (request.method == "PUT"){
		orchestratePUT(request, response)
	} else if (request.method == "DELETE"){
		orchestrateDel(request, response)
	}
};


var orchestrateDel = function(request, response){
	console.log("deleting data");
 	console.log(request.url);
 	var urlArray = request.url.split("/");
 	var orcKey = urlArray[2];
 	console.log(orcKey);

	var data = ""
    request.on('data', function(chunk) {
     data += chunk.toString();
     console.log(data);
    });

    response.end(JSON.stringify(data), null, function(){
    	console.log("inside response.end");
    	console.log(data) });
    	db.remove(dbName, orcKey, true)
    	.then(function(result){
    		console.log("Success from deletion!");
    	})
    	.fail(function (error){
    		console.log("here is the data");
    		console.log(data);
    		console.log("HERE IS THE ERROR");
    		console.log(error.body)
    	});
    };
 

var orchestrateDB = function(request, response){
	console.log("triggering orch db");
	db.list(dbName, 100)
	.then(function (result) {
		var unfilteredData = result.body.results[0].value;
		countDown++;
		var dataArray = [];
		var data = '';
		var testData = '';
		for (i = 0; i <result.body.results.length; i++){
		dataArray.push(result.body.results[i].value);
		};		
		response.end(JSON.stringify(dataArray), null, function(){
		});
	})
	.fail(function (err) {
		countDown++;
		console.log("logged from grab fail " + countDown);
		console.log(err);
		return;
	})
};
 var orchestratePUT = function(request, response){
 	console.log("placing data");
 	console.log(request.url);
	var data = "";
    request.on('data', function(chunk) {
     data += chunk.toString();

    	console.log('data from request.on');
    	console.log(data);



   response.end(JSON.stringify(data), null, function(){
    	console.log("data from within response.end");
    	console.log(data);
	var parsedJSON = JSON.parse(data);
    	db.put(dbName, parsedJSON._id, parsedJSON)
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
  });
 };   


var grabCollection = function(request, response){
	return orchestrateDB(request, response);
};


router.addRoute("/api", orchestrateDB);
router.addRoute("/apiPUT/:n?", chooseMethod);

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
	, filename = path.join(process.cwd(), uri);
	console.log(uri);
	uriSplit = uri.split("/");
	var match = router.match(uri);
	if (match != undefined){
		match.fn(request, response)
		return;
	}
/*
	if (uri == "/favicon.ico"){
		return;
	}
*/
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