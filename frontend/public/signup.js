/* ============================================================================
 * Form elements
 * ========================================================================= */
const signup = {
  username: document.querySelector('#form-username'),
  password: document.querySelector('#form-password'),
  email: document.querySelector('#form-email'),
  submit: document.querySelector('#signup-submit'),
  error: document.querySelector('#form-error'),
  switch: document.querySelector('#switch-to-login'),
}

/* ============================================================================
 * Handle signup
 * ========================================================================= */
signup.submit.addEventListener('click', e => {
  e.preventDefault();

  signup.error.innerHTML = '';

  // Call API
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify
      (
        {
          username: signup.username.value,
          password: signup.password.value,
          email: signup.email.value
        }
      )
  })

    // Convert from json => object
    .then(res => res.json())

    // Handle response
    .then(response => {

      console.log(response);

      if (response.status == 'success') {

        // Use cookie to stash token and username!
        setCookie('auth-token', response['auth-token']);
        setCookie('username', signup.username.value);

        location.href = '/secure';

      } else {

        signup.error.innerHTML = response.error;

      }

    });
}
);

/* ============================================================================
 * Switch to login popup
 * ========================================================================= */
signup.switch.addEventListener('click', e => {
  const elements = {
    login: document.querySelectorAll('.popup-login'),
    signup: document.querySelectorAll('.popup-signup')
  };
  elements.login.forEach(e => e.classList.remove('hidden'));
  elements.signup.forEach(e => e.classList.add('hidden'));
});

