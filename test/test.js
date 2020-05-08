/** Requires assert of `assert` library and use strict.
* @requires assert
*/
const assert = require('assert').strict;
/** Requires flight-data of `flight-data` library.
* @requires flight-data
*/
const jellyfish = require('../lib/flight-data.js');

/** A function that tests whether the received object is as expected
* @function
*/
describe('getFlightData', function() {
  it('should return a known API response object', function() {
    return jellyfish.getFlightData()
      .then(function(data) {
        assert.equal(data[0].number, "UA 427", "should be 'UA 427'");
      });
  });
});
