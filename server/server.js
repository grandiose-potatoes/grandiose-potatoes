var express = require('express'); 
var bodyParser = require('body-parser'); 

var app = express(); 
app.use(express.static(__dirname + '/../client'))
app.port = 3000; 

app.listen(app.port, function(){
	console.log('we are listening!')
}); 