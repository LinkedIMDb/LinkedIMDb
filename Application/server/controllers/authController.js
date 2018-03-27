const bcrypt = require('bcrypt');
const db = require('../config');
const sqlstring = require('sqlstring');
const SALT_WORK_FACTOR = 10;

const authController = {};

// Validate that the user has input a valid email address, password (>6 characters), first name, and last name.
authController.validateSignupInput = (req, res, next) => {
  const errors = {};
  let formIsValid = true;
  let message;

  if (!req.body || typeof req.body.email !== 'string' || req.body.email.trim().length === 0) {
    formIsValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (typeof req.body.password !== 'string' || req.body.password.trim().length === 0) {
    formIsValid = false;
    errors.password = 'Please provide your password.';
  }

  if (typeof req.body.firstName !== 'string' || req.body.firstName.trim().length === 0) {
    formIsValid = false;
    errors.password = 'Please provide your first name.';
  }

  if (typeof req.body.lastName !== 'string' || req.body.lastName.trim().length === 0) {
    formIsValid = false;
    errors.password = 'Please provide your last name.';
  }

  if (!isFormValid) {
    message = 'You have entered invalid information';
  }

  res.locals.success = formIsValid;
  res.locals.message = message;
  res.locals.errors = errors;

  next();
};

// Validate that the user has input a valid email and password.
authController.validateLoginInput = (req, res, next) => {
  const errors = {};
  let formIsValid = true;
  let message;

  if (!req.body || typeof req.body.email !== 'string' || req.body.email.trim().length === 0) {
    formIsValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (typeof req.body.password !== 'string' || req.body.password.trim().length === 0) {
    formIsValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'You have entered invalid information';
  }

  res.locals.success = formIsValid;
  res.locals.message = message;
  res.locals.errors = errors;

  next();
};

// Create new user in the db
authController.createUer = (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  db.query(sqlstring.format('INSERT INTO user (username, email, password, firstname, lastname) values (?,?,?,?,?'), [req.body.username, req.body])
}

authController.prepPassword = (req, res, next) => {
  const user = req.body.user;
  i
}

module.exports = authController;