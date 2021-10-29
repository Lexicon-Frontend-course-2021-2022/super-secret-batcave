/* ============================================================================
 * jwt Token
 * ========================================================================= */
const { response } = require('express');
const { verify } = require('../helpers/token');

/* ============================================================================
 * Express middleware function
 * ========================================================================= */
module.exports = (req, res, next) => {

  // We use cookies to pass jwt token!
  // Build a `cookies` object from cookies in header
  const cookies = {};
  if (req.headers.cookie) {
    req.headers.cookie.split('; ').forEach(item => {
      const [key, value] = item.split('=');
      cookies[key] = value;
    });
  }

  const token = cookies['auth-token'];

  // If no token OR wrong token, redirect to app root!
  if (!token) {
    return res.redirect('/');
  }

  if (verify(token)) {
    next();
  } else {
    return res.redirect('/');
  }
}

