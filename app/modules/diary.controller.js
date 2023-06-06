const models = require("../models");
const { Op } = require("sequelize");
const DiaryExercise = models.DiaryExercise;
const DiaryMeal = models.DiaryMeal;

exports.addDiaryExercise = async (req, res) => {
	const { name, calories, duration, sets, repetition, date } = req.params;

	try {
		await DiaryExercise.create({
			name: name.toLowerCase(),
			calories,
			duration,
			sets,
			repetition,
			date,
		});

		return res.status(201).send({
			message: "Exercise created successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({
			message: e.errors?.[0]?.message ?? "Failed to create exercise",
		});
	}
};
exports.getDiaryExercise = async (req, res) => {
	const { start_date, end_date } = req.query;

	try {
		const foundData = await DiaryExercise.findAll({
			where: { date: { [Op.between]: [start_date, end_date] } },
		});

		if (foundData.length === 0) {
			return res.status(400).send({
				message: "No Exercise data found!",
			});
		}
		return res.status(200).send({
			message: "Exercises data found",
			data: {
				totalCalories: foundData.reduce((accumulator, currentObject) => {
					return accumulator + currentObject.calories;
				}, 0),
				exercises: foundData,
			},
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({
			message: e.errors?.[0]?.message ?? "Something went wrong!",
		});
	}
};

exports.addDiaryMeal = async (req, res) => {
	const { label, name, amount, calories, date } = req.body;

	try {
		await DiaryMeal.create({
			label: label.toLowerCase(),
			name: name.toLowerCase(),
			amount,
			calories,
			date,
		});

		return res.status(201).send({
			message: "Meal created successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({
			message: e.errors?.[0]?.message ?? "Failed to create meal",
		});
	}
};
exports.getDiaryMeal = async (req, res) => {
	const { start_date, end_date } = req.query;

	try {
		const foundData = await DiaryMeal.findAll({
			where: { date: { [Op.between]: [start_date, end_date] } },
		});

		if (foundData.length === 0) {
			return res.status(400).send({
				message: "No Meal data found!",
			});
		}

		// const groupedArray = foundData.reduce((result, item) => {
		// 	if (!result[item.label]) {
		// 		result[item.label] = [];
		// 	}
		// 	result[item.label].push(item);
		// 	return result;
		// }, {});
		const result = Object.values(
			foundData.reduce((acc, item) => {
				if (!acc[item.label]) {
					acc[item.label] = { label: item.label, totalCalories: 0, meals: [] };
				}
				acc[item.label].totalCalories += item.calories;
				acc[item.label].meals.push({
					name: item.name,
					amount: item.amount,
					calories: item.calories,
					date: item.date,
				});
				return acc;
			}, {})
		);

		return res.status(200).send({
			message: "Meal data found",
			data: result,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({
			message: e.errors?.[0]?.message ?? "Something went wrong!",
		});
	}
};
