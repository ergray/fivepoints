var http = require('http');

var server = http.createServer(function(req, res){
	console.log("Listening on port " + process.argv[2])
})

server.listen(process.argv[2] || 5000)