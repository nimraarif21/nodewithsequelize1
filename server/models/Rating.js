const Sequelize=require('sequelize')
// const {sequelize } =require('./index');

class Rating extends Sequelize.Model{}
module.exports = sequelize =>
Rating.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
},
 score: {
    type: Sequelize.INTEGER,
    allowNull: false
},

sequelize, modelName: 'rating' });

module.exports =Rating