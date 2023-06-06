const express = require("express");
const router = express.Router();

const {
	addDiaryMeal,
	getDiaryMeal,
} = require("./diarymeal.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");

router.post("/diary/meal", addDiaryMeal);
router.get("/diary/meal", getDiaryMeal);

module.exports = router;
