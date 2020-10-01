'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'format email is wrong'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        notNull: {
          args: true,
          msg: 'email is required'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'password is required'
        },
        notEmpty: {
          args: true,
          msg: 'password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};