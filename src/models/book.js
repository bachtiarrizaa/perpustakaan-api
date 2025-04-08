'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Author, {
        foreignKey: 'author_id',
        as: 'author'
      });

      Book.belongsTo(models.Publisher, {
        foreignKey: 'publisher_id',
        as: 'publisher'
      });
    }
  }
  Book.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    publisher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};