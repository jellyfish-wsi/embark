var https = require("https");

function getPathString(flightNumStr, depDate) {
  let flightNum = flightNumStr.replace(' ', '');
  let requestString = '/flights/' + flightNum + '/' + depDate + '?withLocation=false&withAircraftImage=false';
  console.log(requestString);
  return requestString;
}

function getFlightData(flightNum, depDate) {
  return new Promise(function(resolve, reject) {

    // gets data from flight UA427 on 2020-03-12
    var creds = {
      "hostname": "aerodatabox.p.rapidapi.com",
      "port": null,
      "path": getPathString(flightNum, depDate),
      "headers": {
        "x-rapidapi-host": "aerodatabox.p.rapidapi.com"
      }
    };

    var request = https.get(creds, function (res) {
      // array of data received from API
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

module.exports = {
  getFlightData
}
