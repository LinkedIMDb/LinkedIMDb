const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// Connect to db
const config = require('./config');

const app = express();

// Serve static files:
// *****************************************************************

// Parse HTTP body messages
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize and use passport middleware
app.use(passport.initialize());

// Load passport strategies - these may not be necessary.
// const localSignupStrategy = require('./server/passport/local-signup');
// const localLoginStrategy = require('./server/passport/local-login');
// passport.use('logal-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// Check for authentication before any api call
const authCheckMiddleware = require('./controllers/authController').checkAuthenticated;
app.use('/api', authCheckMiddleware);

// Authentication Routes
const authRoutes = require('./routes/auth');
// const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
// app.use('/api', apiRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000')
});