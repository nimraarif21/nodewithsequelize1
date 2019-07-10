const Sequelize=require('sequelize')
const Rating=require('./Rating')

class Film extends Sequelize.Model{}
module.exports = sequelize =>
  Film.init({
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
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
  
 sequelize, modelName: 'film' });


Film.hasMany(Rating);

module.exports =Film
// const setAverage_score = film => {
    
// }
// Film.beforeCreate(setAverage_score)
// Film.beforeUpdate(setAverage_score)




