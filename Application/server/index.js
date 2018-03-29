const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const authController = require('./controllers/authController');

// Connect to db
const config = require('./config');

const app = express();

// Serve static files:
app.use(express.static(path.join(__dirname, '../client/')));
// ***************************************************************

// Parse HTTP body messages
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize and use passport middleware
// app.use(passport.initialize());

// Load passport strategies - these may not be necessary.
// const localSignupStrategy = require('./passport/local-signup');
// const localLoginStrategy = require('./passport/local-login');
// passport.use('logal-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// Check for authentication before any api or history call and store user_id in res.locals.user_id
const authCheckMiddleware = require('./controllers/authController').checkAuthenticated;
app.use('/api', authCheckMiddleware);
app.use('/history', authCheckMiddleware);

// Routes for authentication and api
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const historyRoutes = require('./routes/history');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/history', historyRoutes);

// Logout route
app.get('/logout', authController.logOut);

// Catch all other routes and redirect to root
app.get('/*', (req,res) => res.redirect('/'));

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000')
});