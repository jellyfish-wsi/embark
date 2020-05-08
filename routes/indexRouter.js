// Index router.

/** Requires express of `express` library.
* @requires express
*/
var express = require('express');
var router = express.Router();


/** @description GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travel Itinerary' });
});

/** A module that connects to express.Router().
* @module
*/
module.exports = router;
