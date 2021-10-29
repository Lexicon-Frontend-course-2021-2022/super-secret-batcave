/* ============================================================================
 * Route API/register
 * ========================================================================= */
const route = require('express').Router();
const User = require('../models/User');


/* ============================================================================
 * Form validation using joi
 * ========================================================================= */
const validate = require('./../helpers/validate').register;

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


  // Check if email exists
  const emailExists = await User.findOne
    (
      {
        email: req.body.email
      }
    ) ? true : false;

  if (emailExists) {
    return res
      .status(400)
      .json
      (
        {
          status: 'error',
          error: 'Email exists'
        }
      );
  }

  // Check if username exists
  const usernameExists = await User.findOne
    (
      {
        username: req.body.username
      }
    ) ? true : false;

  if (usernameExists) {
    return res
      .status(400)
      .json
      (
        {
          status: 'error',
          error: 'Username exists'
        }
      );
  }


  try {

    const user = new User
      (
        {
          username: req.body.username,
          email: req.body.email,
          password: await bcrypt.hash
            (
              req.body.password,
              await bcrypt.genSalt(SALT_ROUNDS)
            )
        }
      );


    const userObj = await user.save();

    return res
      .status(200)
      .json
      (
        {
          status: 'success',
          'auth-token': token.sign(req.body)
        }
      )

  } catch (error) {

    return res
      .status(400)
      .json
      (
        {
          status: 'error',
          error
        }
      )
  }

});
