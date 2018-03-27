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
        // store primary key of created user;
        res.locals.userId = results.insertId;
        return next();
      }
    }
  );
}

authController.verifyUser = (req, res, next) => {
  db.query(
    sqlstring.format(
      'SELECT username, password, user_id FROM user WHERE username = ?', [req.body.username]
    ),
    (err, results, fields) => {
      // Results is an array of "RowDataPacket"s
      if (err) return res.status(500).send(err);
      if (results.length) {
        // Compare the provided password with the hashed password
        if (bcrypt.compareSync(req.body.password, results[0].password)) {

          res.locals.user_id = results[0].user_id;
          const token = jwt.sign(results[0].user_id, jwtSecret);
          res.locals.token = token;
          return next();
        }
      }
      return res.status(400).send('Invalid credentials');
    }
  );
}

// Check authorization header
authController.checkAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }

  // Retrieve jwt from authorization header
  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      // unauthorized
      return res.sendStatus(401);
    }

    // decoded token (using jwt secret);
    const user_id = decoded;

    // Check db for user;
    db.query(
      sqlstring.format(
        'SELECT username, password, user_id FROM user WHERE username = ?', [req.body.username]
      ),
      (err, results, fields) => {
        // Results is an array of "RowDataPacket"s
        if (err) return res.status(500).send(err);
        if (results.length) {
          // Compare the provided password with the hashed password
          if (bcrypt.compareSync(req.body.password, results[0].password)) {
  
            res.locals.user_id = results[0].user_id;
            const token = jwt.sign(results[0].user_id, jwtSecret);
            res.locals.token = token;
            return next();
          }
        }
        return res.status(400).send('Invalid credentials');
      }
    );
  });

}

module.exports = authController;