const express = require("express");
const router = express.Router();

const {
	addDiaryExercise,
	getDiaryExercise,
} = require("./diaryexercise.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");

router.post("/diary/exercise", addDiaryExercise);
router.get("/diary/exercise", getDiaryExercise);

module.exports = router;
