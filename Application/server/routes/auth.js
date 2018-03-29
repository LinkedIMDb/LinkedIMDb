// All routes in this file will begin with '/auth'

const express = require('express');
const validator = require('validator');
const formValidator = require('../controllers/formValidator');
const authController = require('../controllers/authController');
const passport = require('passport');

// Create a router specifically for authentication
const router = new express.Router();

router.post('/signup',
  formValidator.checkExistingUsername,
  formValidator.validateSignupInput,
  authController.createUser,
  authController.setJWTCookie,
  (req, res) => {
    res.status(200).json({});
  }
);

router.post('/login',
  formValidator.validateLoginInput,
  authController.verifyUser,
  authController.setJWTCookie,
  (req, res) => res.status(200).json({})
);

router.get('/verify',
  authController.checkAuthenticated,
  (req, res) => res.status(200).json(res.locals)
)

module.exports = router;