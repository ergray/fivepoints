var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function(req, res){
	res.send('http://localhost:3000/index.html')
});

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('server listening at %s on port %s', host, port)
});