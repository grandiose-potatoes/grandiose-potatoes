const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const db = require('./db/db');
const session = require('express-session');
const app = express();

app.use(express.static(`${__dirname}/../client`));
app.use(session({ secret: 'test code' }));

app.port = process.env.PORT || 3000;

app.listen(app.port, () => {
  console.log('We are listening!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for routes
// https://expressjs.com/en/guide/routing.html
app.use('/', router);

app.use(bodyParser.json());
