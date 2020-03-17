function init() {
  gapi.load('auth2', function() {
    console.log('inside init');
    gapi.auth2.init();
  });
}

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

function onFailure() {
  console.error('Sign in has failed!');
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

var flightSubmitBtn = document.querySelector('#submit-flight');

flightSubmitBtn.addEventListener('click', function(e) {
  let flightNumberVal = document.querySelector('#flight-number').value;
  let flightNumber = flightNumberVal.replace(' ', '');
  let depDate = document.querySelector('#departure-date').value;
  let requestString = '/flights/' + flightNumber + '/' + depDate + '?withLocation=false&withAircraftImage=false';
  document.querySelector('#path-string').value = requestString;
  console.log(requestString);
});
