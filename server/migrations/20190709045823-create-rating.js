'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rating', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull:false
      },
    score: {
          type: Sequelize.STRING,
          allowNull:false
      },
             
    filmid: {
      type: Sequelize.UUID,
      references: {
          model: 'Film',
          key: 'id'

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
    return queryInterface.dropTable('Rating');
  }
};