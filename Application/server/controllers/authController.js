const bcrypt = require('bcrypt');
const db = require('../config');
const sqlstring = require('sqlstring');
const SALT_WORK_FACTOR = 10;

const authController = {};

// Create new user in the db
authController.createUser = (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  db.query(
    sqlstring.format(
      'INSERT INTO user (username, email, password, firstname, lastname) values (?,?,?,?,?)', [req.body.username, req.body.email, hashedPassword, req.body.firstname, req.body.lastname]), 
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
      'SELECT id, username, password FROM user WHERE username = ?', [req.body.username]
    ),
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      if (results.length) {
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          res.locals.userId = results[0].id;
          return next();
        }
      }
      return res.status(400).send('Invalid credentials');
    }
  );
}

module.exports = authController;