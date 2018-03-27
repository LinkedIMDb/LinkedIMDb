const PassportLocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = new PassportLocalStrategy((req, username, password, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  db.query(
    sqlstring.format(
      'INSERT INTO user (username, email, password, firstname, lastname) VALUES (?,?,?,?,?)', [username.trim(), req.body.email.trim(), hashedPassword, req.body.firstname.trim(), req.body.lastname,trim()]), 
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      else {
        // store primary key of created user;
        res.locals.userId = results.insertId;
        return next();
      }
    }
  );
});