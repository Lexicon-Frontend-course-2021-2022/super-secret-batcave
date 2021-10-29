/* ============================================================================
 * Form elements
 * ========================================================================= */
const login = {
  username: document.querySelector('#login-username'),
  password: document.querySelector('#login-password'),
  submit: document.querySelector('#login-submit')
}

console.log(login);

const register = {
  username: document.querySelector('#register-username'),
  email: document.querySelector('#register-email'),
  password: document.querySelector('#register-password'),
  submit: document.querySelector('#register-submit')
}

/* ============================================================================
 * Handle login
 * ========================================================================= */
login.submit.addEventListener('click', e => {
  e.preventDefault();

  // Call API
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify
      (
        {
          username: login.username.value,
          password: login.password.value
        }
      )
  })

    // Convert from json => object
    .then(res => res.json())

    // Handle response
    .then(response => {

      console.log(response);

      if (response.status == 'success') {

        // Use cookie to stash token!
        setCookie('auth-token', response['auth-token'], 10);

        location.href = '/secure';

      }

    });
}
);

/* ============================================================================
 * Handle register
 * ========================================================================= */
register.submit.addEventListener('click', e => {
  e.preventDefault();

});
