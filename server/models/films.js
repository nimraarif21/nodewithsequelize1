const Rating = require('./rating');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define('films', {
    filmID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    filmTitle: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
  },
  description: {
      type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.STRING,
    unique: false,
},
  img_url: {
      type: DataTypes.STRING
},
average_score: {
    type: DataTypes.INTEGER
},
  });
  
  Film.associate = function(models) {
    Film.hasMany(models.ratings, { as: 'ratings' })
  };

const setAverage_score = film => {
    
}
Film.beforeCreate(setAverage_score)
Film.beforeUpdate(setAverage_score)

  return Film;
};



