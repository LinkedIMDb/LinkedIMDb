const authController = {};

// Validate that the user has input a valid email address, password (>6 characters), first name, and last name.
function validateSignupInput(req, res, next) {
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
function validateLoginInput(req, res, next) {
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

module.exports = authController;