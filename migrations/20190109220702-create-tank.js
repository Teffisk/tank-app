'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tanks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tank_id: {
        type: Sequelize.INTEGER
      },
      short_name: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price_gold: {
        type: Sequelize.INTEGER
      },
      nation: {
        type: Sequelize.STRING
      },
      is_premium: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      price_credit: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      tier: {
        type: Sequelize.INTEGER
      },
      images: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tanks');
  }
};