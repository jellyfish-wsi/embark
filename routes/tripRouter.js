// Trip router.

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
/** Requires models of `models` library.
* @requires models
*/
var models = require('../db/models');
var router = express.Router();


/** @description GET form page. */
router.get('/',
  connect.ensureLoggedIn('/auth'),
  function(req, res, next) {
  res.render('newtrip', { title: 'Travel Itinerary' });
});

/** @description POST form page. */
router.post('/',
  connect.ensureLoggedIn('/auth'),
  async function(req, res, next) {
    const tripData = req.body;

    let flightNumber = tripData.flightNumber;
    let departureDate = tripData.flightDeparture;
    var flightInfo;

    try {
      let async_dataList = await flight.getFlightData(flightNumber, departureDate);
      flightInfo = async_dataList[0];
      // res.render('flight', {user: req.user, flightInfo});
      console.log(flightInfo);
    } catch (err) {
      res.status(err.response.status)
      console.log("Caught error! " + err.message);
    }

    models.Trip.create({
      name: tripData.name,
      destination: tripData.destination,
      start_date: tripData.startDate,
      end_date: tripData.endDate,
      acc_name: tripData.accomName,
      acc_address: tripData.accomAddress,
      transport_mode: tripData.mode,
      flight_number: flightInfo.number,
      airline: flightInfo.airline.name,
      fl_departure: flightInfo.departure.scheduledTimeLocal,
      fl_dep_city: flightInfo.departure.airport.name,
      fl_arrival: flightInfo.arrival.scheduledTimeLocal,
      fl_arr_city: flightInfo.arrival.airport.name
    })
    .then(res.redirect('/'));

});

/** A module that connects to express.Router().
* @module
*/
module.exports = router;
