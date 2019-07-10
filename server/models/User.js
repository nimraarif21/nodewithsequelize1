const crypto = require('crypto')
const Sequelize=require('sequelize')

class User extends Sequelize.Model{}
module.exports = sequelize =>
User.init({
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
},
username: {
  type: Sequelize.STRING,
  unique: true,
  allowNull: false
},
password: {
  type: Sequelize.STRING,
  allowNull: false,
  get() {
      return () => this.getDataValue('password')
  }
},
email: {
type: Sequelize.STRING,
unique: true,
allowNull: false,
get() {
    return () => this.getDataValue('email')
}
},
salt: {
  type: Sequelize.STRING,
  get() {
      return() => this.getDataValue('salt')
  }
},

sequelize, modelName: 'user' });

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}
User.encryptPassword = function(plainText, salt) {
  return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.prototype.correctPassword = function(enteredPassword) {
return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}

