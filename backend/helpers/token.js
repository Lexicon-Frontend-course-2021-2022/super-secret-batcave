/* ============================================================================
 * JWT Token code
 * ========================================================================= */
const jwt = require('jsonwebtoken');

SECRET = process.env.SECRET || "This is a stupid default secret!";

/* ============================================================================
 * Helper function - only use these fields in token
 * ========================================================================= */
const getFields = (data) => {
  const { username, email } = data;
  return { username, email };
}

/* ============================================================================
 * Exports
 * ========================================================================= */
module.exports = {
  sign: (data) => jwt.sign(getFields(data), SECRET),
  verify: (token) => jwt.verify(token, SECRET)
}

