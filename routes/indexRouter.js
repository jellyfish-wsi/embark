// Index router.

/** Requires express of `express` library.
* @requires express
*/
var express = require('express');
/** Requires connect-ensure-login of `connect-ensure-login` library.
* @requires connect-ensure-login
*/
var connect = require('connect-ensure-login');
/** Requires models of `models` library.
* @requires models
*/
var models = require('../db/models');
var router = express.Router();


/** @description GET home page. */
router.get('/',
  connect.ensureLoggedIn('/auth'),
  function(req, res, next) {
    models.Trip.findAll().then(trips => {
      res.render('index', {trips: trips});
    })
});

/** A module that connects to express.Router().
* @module
*/
module.exports = router;
