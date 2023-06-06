const models = require("../../models");
const { Op } = require("sequelize");
const DiaryExercise = models.DiaryExercise;

exports.addDiaryExercise = async (req, res) => {
	const { user_id, name, calories, duration, sets, repetition, date } = req.body;

	try {
		await DiaryExercise.create({
      userId: user_id,
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

