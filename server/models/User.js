'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
        return () => this.getDataValue('password')
    }
},
  salt: {
      type: DataTypes.STRING,
      get() {
          return() => this.getDataValue('salt')
      }
  }

  });
  User.associate = function(models) {
    // associations can be defined here
  };

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

  User.correctPassword = function(enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}

  return User;
};