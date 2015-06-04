var http = require('http');
var fs = require('fs');

fs.readFile('./fivepoints.html', function (err, html){
	if (err) {
		throw err;
	};
	console.log(html);
		http.createServer(function(req, res){
			res.writeHeader(200, {"Content-Type": "text/html"});  
		    res.write(html);
			res.end();
}).listen(process.env.PORT || 5000);
});

var portCall = process.env.PORT || 5000
console.log("Listening on port " + portCall)
console.log(process.env);
console.log(process.env.ORCHESTRATE_KEY);