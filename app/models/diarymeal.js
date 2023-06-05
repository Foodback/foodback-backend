'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryMeal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiaryMeal.belongsTo(models.Diary, { foreignKey: "diaryId", as: 'Diary'})
    }
  }
  DiaryMeal.init({
    diaryId: DataTypes.INTEGER,
    label: DataTypes.ENUM("breakfast", "lunch", "dinner", "snack"),
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    calory: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'DiaryMeal',
  });
  return DiaryMeal;
};
