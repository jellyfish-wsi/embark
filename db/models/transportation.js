'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transportation = sequelize.define('Transportation', {
    company_name: DataTypes.STRING,
    mode: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Transportation.associate = function(models) {
    // associations can be defined here
  };
  return Transportation;
};