/* ============================================================================
 * Form elements
 * ========================================================================= */
const logout = document.querySelector('#logout')

/* ============================================================================
 * Handle logout
 * ========================================================================= */
logout.addEventListener('click', e => {
  e.preventDefault();

  // Delete jwt token & username
  deleteCookie('auth-token');
  deleteCookie('username');

  // Go back to landing page
  location.href = '/';
}
);
