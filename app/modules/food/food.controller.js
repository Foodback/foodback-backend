const axios = require("axios");
exports.getFood = async (req, res) => {
	try {
		const query = req.query.query;
		const fetchFoodAPI = async () => {
			const res = await axios.get(
				`https://api.spoonacular.com/food/menuItems/search?apiKey=${
					process.env.API_KEY_FOOD
				}&query=${query || "salad"}&addMenuItemInformation=true`
			);
			return res;
		};

		const data = await fetchFoodAPI();
		return res.status(200).send({
			message: "Get food success",
			data: data.data,
		});
	} catch (error) {
		console.log("error", error);
		return res.status(500).send({
			message: error ?? "Failed to get food",
		});
	}
};
