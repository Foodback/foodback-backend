
const express = require("express");
const router = express.Router();

const {
  getDiary
} = require("./diary.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.get("/diary", authMiddleware, getDiary);

module.exports = router;
