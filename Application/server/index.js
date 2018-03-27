const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// Connect to db
const config = require('./config');
// const mysql = require('mysql');

// Connect to db
// *****************************************************************

const app = express();

// Serve static files:
// *****************************************************************

// Parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize and use passport middleware
app.use(passport.initialize());

// Load passport strategies
// const localSignupStrategy = require('./server/passport/local-signup');
// const localLoginStrategy = require('./server/passport/local-login');
// passport.use('logal-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// Use authentication checker middleware
// const authCheckMiddleware = require('./server/middleware/auth-check');
// app.use('/api', authCheckMiddleware);

// Authentication Routes
const authRoutes = require('./routes/auth');
// const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
// app.use('/api', apiRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000')
});