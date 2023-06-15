const models = require("../../models");
const sequelize = require("sequelize");
const { Op } = sequelize;

const User = models.User;
const DiaryMeal = models.DiaryMeal;
const DiaryExercise = models.DiaryExercise;

exports.addUser = async (req, res) => {
  const {
    username,
    email,
    gender,
    height,
    weight,
    activity,
    goal,
    target,
    age,
  } = req.body;

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
      age,
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
  const {
    username,
    email,
    gender,
    height,
    weight,
    activity,
    goal,
    target,
    age,
  } = req.body;
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
        age,
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

exports.getHomeData = async (req, res) => {
  try {
    let today = new Date();
    today = today.toISOString().split("T")[0];

    const { email } = req.user;
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["id", "target", "goal"],
    });

    if (!user) {
      return res.status(400).send({
        message: "User not found!",
      });
    }

    const foodCalories = await DiaryMeal.findOne({
      attributes: [sequelize.fn("SUM", sequelize.col("calories"))],
      where: {
        [Op.and]: {
          userId: user.id,
          date: {
            [Op.between]: [today, today],
          },
        },
      },
      raw: true,
    });

    const exerciseCalories = await DiaryExercise.findOne({
      attributes: [sequelize.fn("SUM", sequelize.col("calories"))],
      where: {
        [Op.and]: {
          userId: user.id,
          date: {
            [Op.between]: [today, today],
          },
        },
      },
      raw: true,
    });

    return res.status(200).send({
      message: "Success get home data",
      data: {
        target: user.target,
        goal: user.goal,
        foodCalories: foodCalories.sum,
        exerciseCalories: exerciseCalories.sum,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.errors?.[0]?.message ?? "Failed to get home data",
    });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: [
        "id",
        "username",
        "email",
        "gender",
        "height",
        "weight",
        "activity",
        "goal",
        "target",
        "age",
      ],
    });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    let bmr;

    if (user.weight && user.height && user.weight && user.age) {
      if (user.gender === "male") {
        bmr =
          66.5 + 13.75 * user.weight + 5.003 * user.height - 6.75 * user.age;
      } else {
        bmr =
          655.1 + 9.563 * user.weight + 1.85 * user.height - 4.676 * user.age;
      }
    }

    if(bmr){
      switch(user.activity){
        case 'light':
          bmr *= 1.2
          break;
        case 'moderate':
          bmr *= 1.4
          break;
        case 'active':
          bmr *= 1.6
          break;
        case 'very active':
          bmr *= 1.8
          break;
        default:
          console.log('activity not set')
      }
    }

    if(bmr){
      if (user.goal === 'loss'){
        if(user.gender === 'male'){
          bmr -= 1750
        }else if(user.gender === 'female'){
          bmr -= 1350
        }
      }else if(user.goal === 'gain'){
        bmr += 1000
      }
    }

    return res.status(200).send({
      message: "Success get profile data",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        activity: user.activity,
        goal: user.goal,
        target: user.target,
        age: user.age,
        bmr: bmr ?? 0
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.errors?.[0]?.message ?? "Failed to get profile data",
    });
  }
};
