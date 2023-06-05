'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiaryExercise.belongsTo(models.Diary, { foreignKey: "diaryId", as: 'Diary'})
    }
  }
  DiaryExercise.init({
    name: DataTypes.STRING,
    diaryId: DataTypes.INTEGER,
    calory: DataTypes.FLOAT,
    duration: DataTypes.INTEGER,
    set: DataTypes.INTEGER,
    repetition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiaryExercise',
  });
  return DiaryExercise;
};