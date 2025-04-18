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
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
      });

      User.hasMany(models.Author, {
        foreignKey: 'user_id',
        as: 'createdAuthors'
      });

      User.hasMany(models.Publisher, {
        foreignKey: 'user_id',
        as: 'createdPublishers'
      });

      User.hasMany(models.Loan, {
        foreignKey: 'user_id',
        as: 'loans'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};