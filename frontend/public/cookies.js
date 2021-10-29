/* ============================================================================
 * I stole this from https://www.w3schools.com/js/js_cookies.asp! Woop! Woop!
 *
 * Then I rewrote it for for ES6 :D
 * ========================================================================= */

// Create cookie
const setCookie = (cname, cvalue, exdays = 9999, path = '/') => {

  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

  const cookie = `${cname}=${cvalue};expires=${d.toUTCString()};path=${path}`;
  document.cookie = cookie;

  console.log(cookie);

}

// Delete cookie by setting `expires` to yesterday
const deleteCookie = cname => {
  setCookie(cname, '', -1);
}

// Get cookie
const getCookie = cname => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

