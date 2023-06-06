const express = require("express");
const router = express.Router();

const {
	addDiaryExercise,
	addDiaryMeal,
	getDiaryExercise,
	getDiaryMeal,
	getDiary,
} = require("./diary.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/diary/exercise", addDiaryExercise);
router.get("/diary/exercise", getDiaryExercise);
router.post("/diary/meal", addDiaryMeal);
router.get("/diary/meal", getDiaryMeal);
// router.get("/diary", getDiary);

module.exports = router;
