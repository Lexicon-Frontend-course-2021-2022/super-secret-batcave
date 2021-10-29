/* ============================================================================
 * Use Joi for input validation
 * ========================================================================= */
const Joi = require('@hapi/joi');

/* ============================================================================
 * Define validation rules. These should match the db schema!
 * ========================================================================= */
const fields = {

  username: Joi
    .string()
    .min(6)
    .max(255)
    .required(),

  email: Joi
    .string()
    .min(6)
    .max(255)
    .required()
    .email(),

  password: Joi
    .string()
    .min(6)
    .max(1024)
    .required()

}

/* ============================================================================
 * Exports
 * ========================================================================= */
module.exports = {

  /* --------------------------------------------------------------------------
   * Validation rule for 'register'
   * ----------------------------------------------------------------------- */
  register: (data) => {

    // Pick fields to validate
    const { username, email, password } = fields;

    return Joi.object
      (
        {
          username,
          email,
          password
        }
      ).validate(data);
  },

  /* --------------------------------------------------------------------------
   * Validation rule for 'login'
   * ----------------------------------------------------------------------- */
  login: (data) => {

    // Pick fields to validate
    const { username, password } = fields;

    return Joi.object
      (
        {
          username,
          password
        }
      ).validate(data);
  }

};
