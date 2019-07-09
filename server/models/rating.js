const Film=require('./films');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('ratings', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
 score: {
      type: DataTypes.STRING,
  },
});
Rating.associate = function(models) {
  // Rating.belongsTo(Films, {foreignKey: 'filmID'})
};

  return Rating;
};