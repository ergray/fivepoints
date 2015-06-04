var http = require('http');

var server = http.createServer(function(req, res){
	res.end("HI HI HI")
})
var portCall = process.argv[2] || 5000
server.listen(process.argv[2] || 5000)
console.log("Listening on port " + portCall)
console.log(process.env);
console.log(process.env.ORCHESTRATE_KEY);