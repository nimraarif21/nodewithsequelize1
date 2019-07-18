
'use strict';
module.exports = (sequelize, DataTypes) => {
  const film = sequelize.define('film', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      autoIncrement:true
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
  
  film.associate = function(models) {
    film.hasMany(models.rating, { as: 'ratings' })
  };

const setAverage_score = film => {
    
}
film.beforeCreate(setAverage_score)
film.beforeUpdate(setAverage_score)

  return film;
};



