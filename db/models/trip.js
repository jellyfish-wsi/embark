/** Trip database module
* @module db/models/trip.js
*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    name: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    return_date: DataTypes.DATEONLY,
    transport_mode: DataTypes.STRING
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  return Trip;
};
