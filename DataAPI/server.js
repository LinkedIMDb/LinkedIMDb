const express = require('express');
const bodyParser = require('body-parser');
const connectionsController = require('./controllers/connectionsController');

// Connecting to DB
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/user';
const mLabURI = 'mongodb://superuser:supersecret@ds127899.mlab.com:27899/linkimdb'
mongoose.connect(mLabURI);

const app = express();

// Parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Resolves CORS conflicts
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) res.sendStatus(200);
  else next();
});

// Routes for finding connections

app.get(
  '/connections/:startName/:endName',
  connectionsController.getData,
  (req, res) => {
    res.status(200).json(res.locals.connections)
  }
);

// Catch all other routes and redirect to root
//app.get('/*', (req,res) => res.redirect('/'));

// Start the server
app.listen(8000, () => {
  console.log('Server listening on port 8000')
});