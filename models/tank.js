'use strict';
module.exports = (sequelize, DataTypes) => {
  const tank = sequelize.define('tank', {
    tank_id: DataTypes.INTEGER,
    short_name: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price_gold: DataTypes.INTEGER,
    nation: DataTypes.STRING,
    is_premium: DataTypes.BOOLEAN,
    tag: DataTypes.STRING,
    price_credit: DataTypes.INTEGER,
    type: DataTypes.STRING,
    tier: DataTypes.INTEGER,
    images: DataTypes.STRING,
    next_tanks: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  tank.associate = function(models) {
    // associations can be defined here
  };
  return tank;
};