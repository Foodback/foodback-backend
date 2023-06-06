"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("DiaryMeals", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			diaryId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Diaries",
					key: "id",
				},
				onUpdate: "cascade",
				onDelete: "cascade",
			},
			label: {
				type: Sequelize.ENUM("breakfast", "lunch", "dinner", "snack"),
			},
			name: {
				type: Sequelize.STRING,
			},
			amount: {
				type: Sequelize.FLOAT,
			},
			calories: {
				type: Sequelize.FLOAT,
			},
			date: {
				type: Sequelize.DATE,
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
		await queryInterface.dropTable("DiaryMeals");
	},
};
