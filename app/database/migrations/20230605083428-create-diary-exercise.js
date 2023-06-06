"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("DiaryExercises", {
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
			name: {
				type: Sequelize.STRING,
			},
			calories: {
				type: Sequelize.FLOAT,
			},
			duration: {
				type: Sequelize.INTEGER,
			},
			sets: {
				type: Sequelize.INTEGER,
			},
			repetition: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("DiaryExercises");
	},
};
