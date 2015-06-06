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


router.addRoute("/api", grabCollection)

http.createServer(function(request, response) {
	console.log(process.argv)
}).listen(process.env.PORT || 5000);