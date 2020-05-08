/** Google Authentication module.
* @module lib/google-auth
*/

/** Requires passport of `passport` library and Strategy module of the `passport-google-oauth20` library.
* @requires passport
* @requires passport-google-oauth20
*/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  /** Returns the callback.
  * @private
  * @function
  */
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(null, profile);
    // });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

function getConfiguredPassport() {
  return passport;
}

/** A module that gets passport
* @module passport
*/
module.exports = {
  getConfiguredPassport
}

/** Resources:
* @see {@link https://github.com/jaredhanson/passport-google-oauth2}
* @see {@link https://github.com/passport/express-4.x-facebook-example/blob/master/server.js}
*/
