/** @function */
function init() {
  gapi.load('auth2', function() {
    console.log('inside init');
    gapi.auth2.init();
  });
}

/** A function that gets user data for client-side scripts.
* @function onSignIn
*/
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); /** Don't send this directly to your server! */
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  /** The ID token you need to pass to your backend: */
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

/** A function that displays a failed login if event occurs.
* @function onFailure
*/
function onFailure() {
  console.error('Sign in has failed!');
}

/** A function for signing out.
* @function signOut
*/
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
