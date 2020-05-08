/** User database module
* @module db/models/user.js
*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  // Create a new user
User.create({ name: "Jane", email: "Doe" }).then(jane => {
  console.log("Jane's auto-generated ID:", jane.id);
});

  return User;
};
