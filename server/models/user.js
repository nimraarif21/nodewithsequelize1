const Sequelize = require('sequelize')
const crypto = require('crypto')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      autoIncrement:true
  },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
          return () => this.getDataValue('password')
      }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    get() {
        return () => this.getDataValue('email')
    }
},
  salt: {
      type: DataTypes.STRING,
      get() {
          return() => this.getDataValue('salt')
      }
  }

  });
  user.associate = function(models) {
    // associations can be defined here
  };

  user.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }
  user.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
  }
  
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = user.generateSalt()
        user.password = user.encryptPassword(user.password(), user.salt())
    }
  }

  user.beforeCreate(setSaltAndPassword)
  user.beforeUpdate(setSaltAndPassword)

  user.prototype.correctPassword = function(enteredPassword) {
  return user.encryptPassword(enteredPassword, this.salt()) === this.password()
}

  return user;
};