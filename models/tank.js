'use strict';
module.exports = (sequelize, DataTypes) => {
  const tank = sequelize.define('tank', {
    tank_id: DataTypes.INTEGER,
    short_name: DataTypes.STRING,
    nation: DataTypes.STRING,
    type: DataTypes.STRING,
    tier: DataTypes.INTEGER,
    images: DataTypes.STRING
  }, {});
  tank.associate = function(models) {
    // associations can be defined here
  };
  return tank;
};