// Flight data router.

/** Requires express of `express` library.
* @requires express
*/
var express = require('express');
/** Requires flight-data of `flight-data` library.
* @requires flight-data
*/
var flight = require('../lib/flight-data');
/** Requires connect-ensure-login of `connect-ensure-login` library.
* @requires connect-ensure-login
*/
var connect = require('connect-ensure-login');
var router = express.Router();

router.get('/',
  connect.ensureLoggedIn('/auth'),
  /** Function to get user's name.
  * @function
  */
  function(req, res, next) {
    res.render('flight', {user: req.user});
  });

router.post('/',
  connect.ensureLoggedIn('/auth'),
  /** An async function for flight number and departure date.
  * @async
  * @function
  */
  async function(req, res, next) {
    let flightNumber = req.body.flightNumber;
    let departureDate = req.body.depDate;

    /**
    * @throws Will throw error on faulty response.
    */
    try {
        let async_data = await flight.getFlightData(flightNumber, departureDate);
        res.render('flight', {user: req.user, async_data});

      } catch (err) {
        res.status(err.response.status)
        console.log("Caught error! " + err.message);
      }
  });

/** A module that connects to express.Router().
* @module
*/
module.exports = router;
