const models = require("../models");
const { Op } = require("sequelize");

const User = models.User;

exports.addUser = async (req, res) => {
	const { username, email, gender, height, weight, activity, goal, target } =
		req.body;

	try {
		const user = await User.findOne({
			where: {
				[Op.or]: [{ email }, { username }],
			},
		});

		if (user) {
			return res.status(400).send({
				message: "User already exists",
			});
		}

		await User.create({
			username,
			email,
			gender: gender.toLowerCase(),
			height,
			weight,
			activity: activity.toLowerCase(),
			goal: goal.toLowerCase(),
			target,
		});

		return res.status(201).send({
			message: "Account created successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({
			message: e.errors?.[0]?.message ?? "Failed to create user",
		});
	}
};
exports.editUser = async (req, res) => {
	const { username, email, gender, height, weight, activity, goal, target } =
		req.body;
	const userId = req.params.id;
	try {
		const user = await User.findOne({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return res.status(400).send({
				message: "User not found!",
			});
		}

		await User.update(
			{
				username,
				email,
				gender: gender.toLowerCase(),
				height,
				weight,
				activity: activity.toLowerCase(),
				goal: goal.toLowerCase(),
				target,
			},
			{ where: { id: userId } }
		);

		return res.status(200).send({
			message: "User edited successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({
			message: e.errors?.[0]?.message ?? "Failed to edit user",
		});
	}
};
