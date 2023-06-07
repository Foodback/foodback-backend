const express = require("express");
const router = express.Router();

const { getFood } = require("./food.controller");

const authMiddleware = require("../../middleware/auth.middleware");

// router.get("/food", authMiddleware, getFood);
router.get("/food", getFood);

module.exports = router;
