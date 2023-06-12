const models = require("../../models");
const { Op } = require("sequelize");
const DiaryMeal = models.DiaryMeal;
const DiaryExercise = models.DiaryExercise;
const User = models.User

exports.getDiary = async (req, res) => {
  const {
    start_date,
    end_date
  } = req.query

  if (!start_date || !end_date){
    return res.status(400).send({
      message: "Please provide start date and end date"
    })
  }
  try {
    const { email } = req.user
    const user = await User.findOne({
      where: {
        email: email
      },
      attributes: ["id"]
    })

   const mealsData = await DiaryMeal.findAll({
      where: {
        [Op.and]: {
          userId: user.id,
          date: {
            [Op.between]: [start_date, end_date]
          }
        }
      }
    })

    const exerciseData = await DiaryExercise.findAll({
      where: {
        [Op.and]: {
          userId: user.id,
          date: {
            [Op.between]: [start_date, end_date]
          }
        }
      }
    })
    

		const meals = Object.values(
			mealsData.reduce((acc, item) => {
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

    const exercises = {}
    exercises.totalCalories = exerciseData.reduce((acc, item) => {
     return acc + item.calories 
    }, 0)
    exercises.exercises = exerciseData

    return res.status(200).send({
      message: "success",
      data: {
        meals,
        exercises
      }
    })
  } catch (e) {
		console.log(e);
		return res.status(500).send({
			message: e.errors?.[0]?.message ?? "Something went wrong!",
		});
  }
}
