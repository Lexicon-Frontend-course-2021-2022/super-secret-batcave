/* ============================================================================
 * Handle header intelligence (Login/Logout on the right)
 * ========================================================================= */

const header = {
  login: document.querySelector('div.login'),
  logout: document.querySelector('div.logout'),
  username: document.querySelector('div.username'),
}

const popup = document.querySelector('#popup');

/* ============================================================================
 * If we have a username, we assume we're loggied in. Update header accordingly
 * ========================================================================= */
const username = getCookie('username');
if (username) {
  header.login.classList.add('hidden');
  header.logout.classList.remove('hidden');
  header.username.innerHTML = username;
  popups.login.classList.add('hidden');
} else {
  header.login.classList.remove('hidden');
  header.logout.classList.add('hidden');
}

/* ============================================================================
 * Show/hide login or signup popups
 * ========================================================================= */
header.login.addEventListener('click', e => {
  if (popup.classList.contains('hidden')) {
    popup.classList.remove('hidden');
  } else {
    popup.classList.add('hidden');
  }
}
);
