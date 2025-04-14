'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      Loan.belongsTo(models.Book, {
        foreignKey: 'book_id',
        as: 'book'
      });

      Loan.hasOne(models.Return, {
        foreignKey: 'loan_id',
        as: 'return'
      });
    }
  }
  Loan.init({
    book_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    borrow_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    status: DataTypes.ENUM('dipinjam','dikembalikan')
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};