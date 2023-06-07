const express = require("express");
const router = express.Router();

const {
	addDiaryExercise,
	getDiaryExercise,
} = require("./diaryexercise.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.post("/diary/exercise", authMiddleware, addDiaryExercise);
router.get("/diary/exercise", authMiddleware, getDiaryExercise);

module.exports = router;
