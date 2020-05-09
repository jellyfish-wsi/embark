// Login router.

/** Requires express of `express` library.
* @requires express
*/
var express = require('express');
var router = express.Router();
/** Requires google-auth of `google-auth` library.
* @requires express
* @desc Get configured passport from lib/google-auth.js
*/
var passport = require('../lib/google-auth').getConfiguredPassport();

router.get('/', function(req, res, next) {
  res.render('login', { page_name: 'Login' });
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth' }),
  /** A function for successful authentication.
  * @function
  * @desc After a successful authentication, users get redirected home.
  */
  function(req, res) {
    res.redirect('/');
  });

/** @desc Logging user out and directing them back to the login page with Google Auth */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/auth');
});

/** A module that connects to express.Router().
* @module
*/
module.exports = router;
