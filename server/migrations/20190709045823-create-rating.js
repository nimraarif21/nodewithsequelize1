'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ratings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
      },
    score: {
          type: Sequelize.STRING,
          allowNull:false
      },

         //foreign key usage
    filmid: {
      type: Sequelize.INTEGER,

      references: {
          model: 'films',
          key: 'filmID'

      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
    return queryInterface.dropTable('ratings');
  }
};