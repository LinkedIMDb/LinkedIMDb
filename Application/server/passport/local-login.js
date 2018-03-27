const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');
const bcrypt = require('bcrypt');

module.exports = new PassportLocalStrategy(
  (req, username, password, next) => {
  const userData = {
    username = username.trim(),
    password = password.trim()
  };

  db.query(
    sqlstring.format(
      'SELECT username, password FROM user WHERE username = ?', [req.body.username]
    ),
    (err, results, fields) => {
      console.log(results);
      // Results is an array of "RowDataPacket"s
      if (err) return res.status(500).send(err);
      if (results.length) {
        // Compare the provided password with the hashed password
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          res.locals.userId = results[0].id;
          return next();
        }
      }
      return res.status(400).send('Invalid credentials');
    }
  );
});