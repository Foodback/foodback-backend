"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("Users", "activity", {
			type: Sequelize.ENUM("light", "moderate", "active", "very active"),
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("Users", "activity", {
			type: Sequelize.ENUM("light", "moderate", "active", "very actiave"),
		});
	},
};
