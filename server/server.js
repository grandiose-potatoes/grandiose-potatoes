var db = require('./db/db');
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes');

var app = express();

app.use(express.static(__dirname + '/../client'));
app.port = process.env.PORT || 3000;

app.listen(app.port, function() {
  console.log('we are listening!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for routes
//https://expressjs.com/en/guide/routing.html
app.use('/', router);

app.use(bodyParser.json()); 

