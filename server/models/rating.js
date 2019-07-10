
'use strict';
module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      autoIncrement:true
  },
 score: {
      type: DataTypes.STRING,
  },
});
rating.associate = function(models) {
  // rating.belongsTo(Films, {foreignKey: 'filmID'})
};

  return rating;
};