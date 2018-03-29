const bcrypt = require('bcrypt');
const db = require('../config');
const sqlstring = require('sqlstring');
const jwt = require('jsonwebtoken');
const SALT_WORK_FACTOR = 10;

const authController = {};

const jwtSecret = "make this a secure secret later";

// Create new user in the db
authController.createUser = (req, res, next) => {
  // Hash password using the salt;
  const hashedPassword = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  db.query(
    sqlstring.format(
      'INSERT INTO user (username, email, password, firstname, lastname) VALUES (?,?,?,?,?)', [req.body.username, req.body.email, hashedPassword, req.body.firstname, req.body.lastname]), 
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      else {
        const user_id = results.insertId;
        console.log(user_id);
        const token = jwt.sign(user_id, jwtSecret);
        res.locals.jwt = token;
        return next();
      }
    }
  );
}

authController.verifyUser = (req, res, next) => {
  db.query(
    sqlstring.format(
      'SELECT firstname, lastname, username, password, user_id FROM user WHERE username = ?', [req.body.username]
    ),
    (err, results, fields) => {
      // Results is an array of "RowDataPacket"s
      if (err) return res.status(500).send(err);
      if (results.length) {
        // Compare the provided password with the hashed password
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          const user_id = results[0].user_id;
          const token = jwt.sign(results[0].user_id, jwtSecret);
          res.locals.jwt = token;
          res.locals.firstname = results[0].firstname;
          res.locals.lastname = results[0].lastname;
          return next();
        }
      }
      return res.status(400).send('Invalid credentials');
    }
  );
}

// Check authorization header
authController.checkAuthenticated = (req, res, next) => {
  if (!req.cookies.access_token) {
    console.log('no access token');
    return res.status(401).json({});
  }

  // Retrieve jwt from authorization header
  const token = req.cookies.access_token;

  return jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({});
    }
    // store user_id in res.locals
    res.locals.user_id = decoded;
    next();
  });
}

authController.getUserData = (req, res, next) => {
  db.query(
    sqlstring.format(
      'SELECT firstname, lastname, username, user_id FROM user WHERE user_id = ?', [res.locals.user_id]
    ),
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      return res.send(results[0]);
    }
  );
}

authController.setJWTCookie = (req, res, next) => {
  const cookieVal = res.locals.jwt;
  res.cookie('access_token', res.locals.jwt, { httpOnly: true, maxAge: 100000 });
  next();
}

authController.logOut = (req, res, next) => {
  // direct browser to remove JWT cookie (redirect will happen via React Router)
  res.cookie('access_token', null, { httpOnly: true, maxAge: 0 });
  res.sendStatus(200);
}

module.exports = authController;