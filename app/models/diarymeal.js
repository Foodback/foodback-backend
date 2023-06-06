"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class DiaryMeal extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			DiaryMeal.belongsTo(models.User, { foreignKey: "userId", as: "User" });
		}
	}
	DiaryMeal.init(
		{
			userId: DataTypes.INTEGER,
			label: DataTypes.ENUM("breakfast", "lunch", "dinner", "snack"),
			name: DataTypes.STRING,
			amount: DataTypes.FLOAT,
			calories: DataTypes.FLOAT,
			date: DataTypes.DATEONLY,
		},
		{
			sequelize,
			modelName: "DiaryMeal",
		}
	);
	return DiaryMeal;
};
