/* ============================================================================
 * Route API/login
 * ========================================================================= */
const route = require('express').Router();
const User = require('../models/User');

/* ============================================================================
 * Form validation using joi
 * ========================================================================= */
const validate = require('./../helpers/validate').login;

/* ============================================================================
 * Pasword hashing
 * ========================================================================= */
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

/* ============================================================================
 * JWT tokens
 * ========================================================================= */
const token = require('./../helpers/token');

/* ============================================================================
 * Export single endpoint
 * ========================================================================= */
module.exports = route.post('/', async (req, res) => {

  // Validate indata
  const error = validate(req.body).error;
  if (error) {
    return res
      .status(400)
      .json
      (
        {
          status: 'error',
          error: error.details[0].message
        }
      );
  }

  // Verify that username exists in database
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res
      .status(400)
      .json
      (
        {
          status: 'error',
          error: 'Username does not exist'
        }
      );
  }
  // Verify password against stored hash
  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res
      .status(400)
      .json
      (
        {
          status: 'error',
          error: 'Invalid password'
        }
      );
  }

  return res
    .status(200)
    .json
    (
      {
        status: 'success',
        'auth-token': token.sign(user)
      }
    )

});

