const express = require("express");
const router = express.Router();

const {
	addDiaryMeal,
	getDiaryMeal,
} = require("./diarymeal.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.post("/diary/meal", authMiddleware, addDiaryMeal);
router.get("/diary/meal", authMiddleware, getDiaryMeal);

module.exports = router;
