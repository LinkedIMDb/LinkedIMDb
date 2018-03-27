const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files:

// Authentication Routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000')
});