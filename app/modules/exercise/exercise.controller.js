const axios = require("axios");
exports.getExercise = async (req, res) => {
	try {
		const query = req.query.query;
		const fetchExerciseAPI = async () => {
			const res = await axios.get(
				`https://api.api-ninjas.com/v1/caloriesburned?activity=${
					query || "walk"
				}`,
				{ headers: { "X-Api-Key": process.env.API_KEY_EXERCISE } }
			);
			return res;
		};

		const data = await fetchExerciseAPI();
		return res.status(200).send({
			message: "Get exercise success",
			data: data.data,
		});
	} catch (error) {
		console.log("error", error);
		return res.status(500).send({
			message: error ?? "Failed to get exercise",
		});
	}
};
