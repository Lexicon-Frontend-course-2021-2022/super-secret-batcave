/* ============================================================================
 * User db schema
 * ========================================================================= */
const { Schema, model } = require('mongoose');

module.exports = model
  (
    'User',
    Schema
      (
        {
          username: {
            type: String,
            required: true,
            min: 6,
            max: 1024
          },

          password: {
            type: String,
            required: true,
            min: 6,
            max: 1024
          },

          email: {
            type: String,
            required: true
          },

          registered: {
            type: Date,
            required: true,
            default: Date.now()
          }

        }
      )
  )
