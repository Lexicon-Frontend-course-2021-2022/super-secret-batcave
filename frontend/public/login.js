/* ============================================================================
 * Form elements
 * ========================================================================= */
const elements = {
  username: document.querySelector('#form-username'),
  password: document.querySelector('#form-password'),
  submit: document.querySelector('#login-submit'),
  error: document.querySelector('#form-error'),
  switch: document.querySelector('#switch-to-signup'),
}

/* ============================================================================
 * Handle login
 * ========================================================================= */
elements.submit.addEventListener('click', e => {
  e.preventDefault();

  elements.error.innerHTML = '';

  // Call API
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify
      (
        {
          username: elements.username.value,
          password: elements.password.value
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
        setCookie('username', elements.username.value);

        location.href = '/secure';

      } else {

        elements.error.innerHTML = response.error;

      }

    });
}
);

/* ============================================================================
 * Switch to signup popup
 * ========================================================================= */
elements.switch.addEventListener('click', e => {
  const elements = {
    login: document.querySelectorAll('.popup-login'),
    signup: document.querySelectorAll('.popup-signup')
  };
  elements.login.forEach(e => e.classList.add('hidden'));
  elements.signup.forEach(e => e.classList.remove('hidden'));
});

