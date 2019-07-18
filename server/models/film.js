
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

  film.prototype.setAverage_score = async function (filmData) {
    let ratings = await filmData.getRatings()
    let score=0;
   score=ratings.reduce((a, b) => ({score: a.score + b.score}))
    let avg=score.score/ratings.length;
    avg=Math.floor(avg);

   await filmData.update({
      average_score:avg
    })
  }
  return film;
};








