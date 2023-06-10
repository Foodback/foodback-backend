"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.DiaryMeal, { foreignKey: "userId", as: "Meals" });
			User.hasMany(models.DiaryExercise, {
				foreignKey: "userId",
				as: "Exercises",
			});
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: {
					args: false,
					msg: "Please enter your username",
				},
				unique: {
					args: true,
					msg: "Username already exists",
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: {
					args: false,
					msg: "Please enter your email address",
				},
				unique: {
					args: true,
					msg: "Email already exists",
				},
				validate: {
					isEmail: {
						args: true,
						msg: "Please enter a valid email address",
					},
				},
			},
			gender: DataTypes.ENUM("male", "female"),
			height: DataTypes.INTEGER,
			weight: DataTypes.INTEGER,
			activity: DataTypes.ENUM("light", "moderate", "active", "very active"),
			goal: DataTypes.ENUM("gain", "maintain", "loss"),
			target: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
