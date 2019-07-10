'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Film', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull:false
    },
      filmTitle: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
    },
      year: {
        type: Sequelize.STRING,
        unique: false,
    },
      img_url: {
          type: Sequelize.STRING
    },
    average_score: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Film');
  }
};