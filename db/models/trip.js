/** Trip database module
* @module db/models/trip.js
*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    name: DataTypes.STRING,
    destination: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    acc_name: DataTypes.STRING,
    acc_address: DataTypes.STRING,
    transport_mode: DataTypes.STRING,
    flight_number: DataTypes.STRING,
    airline: DataTypes.STRING,
    fl_departure: DataTypes.STRING,
    fl_dep_city: DataTypes.STRING,
    fl_arrival: DataTypes.STRING,
    fl_arr_city: DataTypes.STRING
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  return Trip;
};
