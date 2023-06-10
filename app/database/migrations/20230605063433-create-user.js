"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			gender: {
				type: Sequelize.ENUM("male", "female"),
			},
			height: {
				type: Sequelize.INTEGER,
			},
			weight: {
				type: Sequelize.INTEGER,
			},
			activity: {
				type: Sequelize.ENUM("light", "moderate", "active", "very active"),
			},
			goal: {
				type: Sequelize.ENUM("gain", "maintain", "loss"),
			},
			target: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
