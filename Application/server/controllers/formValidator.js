const db = require('../config');
const sqlstring = require('sqlstring');

const formValidator = {};

formValidator.checkExistingUsername = (req, res, next) => {
  db.query(
    sqlstring.format('SELECT username FROM user WHERE username = ?', [req.body.username]), (err, results, fields) => {
      if (err) return res.status(400).send(err);
      if (results.length) {
        const errors = {};
        errors.username = 'The username you provided has been taken. Please choose a new username.'
        return res.status(400).json({errors});
      }
      return next();
    }
  );
}

// Validate that the user has input a valid email address, password (>6 characters), first name, and last name.
formValidator.validateSignupInput = (req, res, next) => {
  const errors = {};
  let formIsValid = true;
  let message = '';

  if (!req.body || typeof req.body.username !== 'string' || req.body.username.trim().length === 0) {
    formIsValid = false;
    errors.username = 'Please provide a username.';
  }

  if (typeof req.body.email !== 'string' || req.body.email.trim().length === 0) {
    formIsValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (typeof req.body.password !== 'string' || req.body.password.trim().length === 0) {
    formIsValid = false;
    errors.password = 'Please provide your password.';
  }

  if (typeof req.body.firstname !== 'string' || req.body.firstname.trim().length === 0) {
    formIsValid = false;
    errors.firstname = 'Please provide your first name.';
  }

  if (typeof req.body.lastname !== 'string' || req.body.lastname.trim().length === 0) {
    formIsValid = false;
    errors.lastname = 'Please provide your last name.';
  }

  if (!formIsValid) {
    message = 'You have entered invalid information';
  }

  res.locals.success = formIsValid;
  res.locals.message = message;
  res.locals.errors = errors;

  if (!formIsValid) {
    console.log(res.locals);
    return res.status(400).json(res.locals);
  }
  return next();
};

// Validate that the user has input a valid email and password.
formValidator.validateLoginInput = (req, res, next) => {
  const errors = {};
  let formIsValid = true;
  let message = '';

  if (!req.body || typeof req.body.username !== 'string' || req.body.username.trim().length === 0) {
    formIsValid = false;
    errors.username = 'Please provide your email address.';
  }

  if (typeof req.body.password !== 'string' || req.body.password.trim().length === 0) {
    formIsValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!formIsValid) {
    message = 'You have entered invalid information';
  }

  res.locals.success = formIsValid;
  res.locals.message = message;
  res.locals.errors = errors;

  if (!formIsValid) {
    return res.status(400).json(res.locals);
  }
  return next();
};

module.exports = formValidator;