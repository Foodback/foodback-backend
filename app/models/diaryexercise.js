"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class DiaryExercise extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			DiaryExercise.belongsTo(models.User, {
				foreignKey: "userId",
				as: "User",
			});
		}
	}
	DiaryExercise.init(
		{
			name: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			calories: DataTypes.FLOAT,
			duration: DataTypes.INTEGER,
			sets: DataTypes.INTEGER,
			repetition: DataTypes.INTEGER,
			date: DataTypes.DATEONLY,
		},
		{
			sequelize,
			modelName: "DiaryExercise",
		}
	);
	return DiaryExercise;
};
