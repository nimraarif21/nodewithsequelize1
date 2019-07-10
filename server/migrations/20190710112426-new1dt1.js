'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'ratings', // name of Source model
      'filmId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'films', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'ratings', // name of Source model
      'filmId' // key we want to remove
    );
  
  
  }
};
