'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
  }, {
    // options
  });

  return user;
};