const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

app.use(express.static(`${__dirname}/../client`));
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
