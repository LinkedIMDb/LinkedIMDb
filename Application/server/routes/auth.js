// All routes in this file will begin with '/auth'

const express = require('express');
const validator = require('validator');
const formValidator = require('../controllers/formValidator');
const authController = require('../controllers/authController');

// Create a router specifically for authentication
const router = new express.Router();

router.post('/signup',
  formValidator.validateSignupInput,
  authController.createUser,
  (req, res) => res.send(200)
);

router.post('/login',
  formValidator.validateLoginInput,
  (req, res) => res.send(200)
);

module.exports = router;