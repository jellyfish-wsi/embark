// Index router.

/** Requires express of `express` library.
* @requires express
*/
var express = require('express');
/** Requires connect-ensure-login of `connect-ensure-login` library.
* @requires connect-ensure-login
*/
var connect = require('connect-ensure-login');
var router = express.Router();


/** @description GET home page. */
router.get('/',
  connect.ensureLoggedIn('/auth'),
  function(req, res, next) {
  res.render('index', { title: 'Travel Itinerary' });
});

/** A module that connects to express.Router().
* @module
*/
module.exports = router;
