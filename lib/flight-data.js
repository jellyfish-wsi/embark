/** Flight data module.
* @module lib/flight-data
*/

/** Requires https of `https` library.
* @requires https
*/
var https = require("https");

/** Function returns the flight with its number and departure date.
* @function getPathString
* @param {string} flightNumStr Flight number as a string
* @param {string} depDate Flight departure date
* @returns {string}
*/
function getPathString(flightNumStr, depDate) {
  let flightNum = flightNumStr.replace(' ', '');
  let requestString = '/flights/' + flightNum + '/' + depDate + '?withLocation=false&withAircraftImage=false';
  console.log(requestString);
  return requestString;
}

/** Function gets data from flight API.
* @function getFlightData
* @param {string} flightNum Flight number
* @param {string} depDate Flight departure date
* @returns Promise
*/
function getFlightData(flightNum, depDate) {
  return new Promise(function(resolve, reject) {
    /** Get data from flight UA427 on 2020-03-12.
    * @var {array} creds
    */
    var creds = {
      "hostname": "aerodatabox.p.rapidapi.com",
      "port": null,
      "path": getPathString(flightNum, depDate),
      "headers": {
        "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
        "x-rapidapi-key": process.env.FLIGHT_API_KEY
      }
    };

    var request = https.get(creds, function (res) {
      /** Array of data received from API.
      * @member {array} rawdata
      */
      let rawdata = [];
      // if we receive data, add it to array 'rawdata'
      res.on('data', function(data) {
          rawdata.push(data);
      });
      // after we receive data, parse 'rawdata' as JSON
      res.on('end', function() {
        console.log(JSON.parse(rawdata.join('')));
        resolve(JSON.parse(rawdata.join('')));
      });
    });
    request.on('error', function(err) {
      reject(err);
    });
  }); // end of Promise
} // end of function getFlightData()

/** A module that gets flight data
* @module 
*/
module.exports = {
  getFlightData
}
