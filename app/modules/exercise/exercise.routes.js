const express = require("express");
const router = express.Router();

const { getExercise } = require("./exercise.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.get("/exercise", authMiddleware, getExercise);

module.exports = router;
