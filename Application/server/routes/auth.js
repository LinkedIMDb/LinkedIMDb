// All routes in this file will begin with '/auth'

const express = require('express');
const validator = require('validator');
const authController = require('../controllers/authController');

// Create a router specifically for authentication
const router = new express.Router();

router.post('/signup',
  authController.validateSignupInput,
  (req, res) => {
    if (!res.locals.success) {
      return res.status(400).json(res.locals);
    }
    return res.status(200).end();
});

router.post('/login',
  authController.validateLoginInput,
  (req ,res) => {
    if (!res.locals.success) {
      return res.status(400).json(res.locals);
    }
    return res.status(200).end();
});

module.exports = router;