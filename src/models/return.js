'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Return extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Return.belongsTo(models.Loan, {
        foreignKey: 'loan_id',
        as: 'loan'
      });
    }
  }
  Return.init({
    loan_id: DataTypes.INTEGER,
    actual_return_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Return',
  });
  return Return;
};