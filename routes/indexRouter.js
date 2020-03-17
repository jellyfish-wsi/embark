var express = require('express');
var flight = require('../lib/flight-data');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travel Itinerary' });
});

router.get('/flight', function(req, res, next) {
  res.render('flight', {title: 'Flight Information'});
});

router.post('/flight', async function(req, res, next) {
  let apiPathString = req.body.pathString;

  try {
      let async_data = await flight.getFlightData(apiPathString);
      res.render('flight', {title: 'Flight Information', async_data});

    } catch (err) {
      res.status(err.response.status)
      console.log("Caught error! " + err.message);
    }
});

module.exports = router;
